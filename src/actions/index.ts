import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

// Domain-neutral action. It exists only to prove that server-side validation
// and zero-JS form submission work through Astro's own pipeline.
export const server = {
  probe: defineAction({
    accept: 'form',
    input: z.object({
      value: z.string().min(1),
    }),
    handler: ({ value }) => ({ received: value }),
  }),
};
