// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['mature', 'growing', 'seedling']),
    summary: z.string(),
    tech: z.array(z.string()),
    liveUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    repoIsPrivate: z.boolean().default(false),
    logo: z.string().optional(),
    screenshots: z.array(z.string()).optional(),
    startDate: z.coerce.date().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

const tech = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tech' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
  }),
});

export const collections = { projects, tech };