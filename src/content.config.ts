import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Events: one markdown file per event in src/content/events/.
 * Copy _TEMPLATE.md to start a new one. Files starting with _ are ignored,
 * and draft: true keeps an event out of the built site.
 */
const events = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    /** Start date AND time with timezone offset, e.g. 2026-07-18T18:30:00-04:00 */
    start: z.coerce.date(),
    /** Optional end time; defaults to two hours after start for calendar links. */
    end: z.coerce.date().optional(),
    /** One- or two-sentence summary used in cards, meta description, and schema. */
    description: z.string(),
    /** Who it's for, e.g. "All ages" or "Adults — sober-friendly evening" */
    audience: z.string().optional(),
    /** "Free", "$5 suggested donation", "$10 at the door", ... */
    cost: z.string().default('Free'),
    /** Accessibility & parking notes specific to this event. */
    accessibility: z.string().optional(),
    performers: z
      .array(
        z.object({
          name: z.string(),
          bio: z.string().optional(),
          url: z.string().url().optional(),
        })
      )
      .default([]),
    rsvpUrl: z.string().url().optional(),
    /** Share image in /public, e.g. /images/events/open-mic-july.jpg */
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

/**
 * Updates/news posts: one markdown file per post in src/content/posts/.
 * These power the /updates/ section — the weekly content-calendar posts.
 */
const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { events, posts };
