import { LinkState, check } from 'linkinator';

// Linkinator serves the scanned directory from a temporary local server and
// emits both of these hostnames for the same site, so both count as internal.
const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]']);

const checkExternal = process.argv.includes('--external');

/**
 * Semantic external check: anything reachable over http(s) on a host that is
 * not Linkinator's own temporary server. Non-http protocols (mailto:, tel:)
 * are left to Linkinator's own handling.
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

const { passed, links } = await check({
  path: 'dist',
  recurse: true,
  ...(checkExternal ? {} : { linksToSkip: isExternalHttpUrl }),
});

const scanned = links.filter((link) => link.state !== LinkState.SKIPPED);
const broken = links.filter((link) => link.state === LinkState.BROKEN);

// Fail-closed invariant: a filter that accidentally excludes the local root
// makes Linkinator pass while checking nothing at all.
if (scanned.length === 0) {
  console.error(
    'Link check aborted: zero links were scanned. This likely indicates a misconfigured filter.',
  );
  process.exit(1);
}

for (const link of broken) {
  console.error(`BROKEN [${link.status ?? 'no status'}] ${link.url}`);
  if (link.parent) console.error(`  linked from ${link.parent}`);
}

const mode = checkExternal ? 'internal + external' : 'internal only';
console.log(
  `Checked ${scanned.length} links (${mode}), ${links.length - scanned.length} skipped, ${broken.length} broken.`,
);

process.exit(passed && broken.length === 0 ? 0 : 1);
