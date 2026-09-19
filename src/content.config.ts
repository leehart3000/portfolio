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

const employments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/employments' }),
  schema: z.object({
    name: z.string(),
    url: z.string().url().optional(),
    logo: z.string().optional(),
    summary: z.string(),
    tech: z.array(z.string()),
    jobTitles: z.array(z.object({
      title: z.string(),
      start: z.string(),
      end: z.string().optional(),
    })),
    status: z.object({
      label: z.string(),
      emoji: z.string(),
    }).optional(),
    order: z.number().default(0),
  }),
});

const certificates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/certificates' }),
  schema: z.object({
    name: z.string(),
    provider: z.string(),
    providerUrl: z.string().url().optional(),
    type: z.string(),
    url: z.string().url().optional(),
    logo: z.string().optional(),
    summary: z.string(),
    tech: z.array(z.string()).default([]),
    completionDate: z.string(),
    duration: z.string().optional(),
    relatedCertificates: z.array(z.object({
      name: z.string(),
      slug: z.string(),
    })).optional(),
    status: z.object({
      label: z.string(),
      emoji: z.string(),
    }).optional(),
    order: z.number().default(0),
  }),
});

export const collections = { projects, tech, employments, certificates };