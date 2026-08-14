import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Domain-neutral collection. It exists only to prove that schema-validated
// content works through Astro's normal build pipeline.
const probe = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/probe' }),
  schema: z.object({
    title: z.string(),
    enabled: z.boolean(),
  }),
});

export const collections = { probe };
