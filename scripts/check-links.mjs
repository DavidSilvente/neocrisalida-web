import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { LinkState, check } from 'linkinator';

const HOST = '127.0.0.1';
// Dedicated port: Playwright owns 4322 and `astro dev` defaults to 4321.
const PORT = 4324;
const BASE_URL = `http://${HOST}:${PORT}`;

const READY_TIMEOUT_MS = 20_000;
const READY_INTERVAL_MS = 100;
const STOP_TIMEOUT_MS = 5_000;

// The production server answers on both of these for the same site, so both
// count as internal.
const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]']);

const checkExternal = process.argv.includes('--external');

/**
 * Semantic external check: anything reachable over http(s) on a host that is
 * not our own production server. Non-http protocols (mailto:, tel:) are left
 * to Linkinator's own handling.
 *
 * @param {string} link
 * @returns {Promise<boolean>} true when the link should be skipped
 */
async function isExternalHttpUrl(link) {
  try {
    const { protocol, hostname } = new URL(link);
    if (protocol !== 'http:' && protocol !== 'https:') return false;
    return !LOCAL_HOSTNAMES.has(hostname);
  } catch {
    // Unparseable link: check it rather than silently skipping it.
    return false;
  }
}

/**
 * Poll the server until it answers, so readiness is observed rather than
 * assumed. Fails fast if the process dies before becoming reachable.
 *
 * @param {import('node:child_process').ChildProcess} server
 * @param {() => string} readLog
 */
async function waitForServer(server, readLog) {
  const deadline = Date.now() + READY_TIMEOUT_MS;

  while (Date.now() < deadline) {
    if (server.exitCode !== null || server.signalCode !== null) {
      throw new Error(
        `Production server exited before becoming reachable (code ${server.exitCode}).\n${readLog()}`,
      );
    }

    try {
      await fetch(BASE_URL, { signal: AbortSignal.timeout(1000) });
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, READY_INTERVAL_MS));
    }
  }

  throw new Error(
    `Production server was not reachable at ${BASE_URL} within ${READY_TIMEOUT_MS}ms.\n${readLog()}`,
  );
}

/**
 * @param {import('node:child_process').ChildProcess} server
 */
async function stopServer(server) {
  if (server.exitCode !== null || server.signalCode !== null) return;

  server.kill('SIGTERM');
  const force = setTimeout(() => server.kill('SIGKILL'), STOP_TIMEOUT_MS);
  try {
    await once(server, 'exit');
  } finally {
    clearTimeout(force);
  }
}

const server = spawn('node', ['./dist/server/entry.mjs'], {
  env: { ...process.env, HOST, PORT: String(PORT) },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let serverLog = '';
const collect = (chunk) => (serverLog += String(chunk));
server.stdout.on('data', collect);
server.stderr.on('data', collect);

// Never process.exit() inside the try: it would skip the finally block and
// leave the production server running.
// Starts at 1 so any unexpected path fails closed rather than reporting success.
let exitCode = 1;

try {
  await waitForServer(server, () => serverLog);

  const { passed, links } = await check({
    path: BASE_URL,
    recurse: true,
    ...(checkExternal ? {} : { linksToSkip: isExternalHttpUrl }),
  });

  const scanned = links.filter((link) => link.state !== LinkState.SKIPPED);
  const broken = links.filter((link) => link.state === LinkState.BROKEN);

  // Fail-closed invariant: a filter that accidentally excludes the site root
  // makes Linkinator pass while checking nothing at all.
  if (scanned.length === 0) {
    console.error(
      'Link check aborted: zero links were scanned. This likely indicates a misconfigured filter.',
    );
  } else {
    for (const link of broken) {
      console.error(`BROKEN [${link.status ?? 'no status'}] ${link.url}`);
      if (link.parent) console.error(`  linked from ${link.parent}`);
    }

    const mode = checkExternal ? 'internal + external' : 'internal only';
    console.log(
      `Checked ${scanned.length} links (${mode}), ${links.length - scanned.length} skipped, ${broken.length} broken.`,
    );

    exitCode = passed && broken.length === 0 ? 0 : 1;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
} finally {
  await stopServer(server);
}

process.exit(exitCode);
