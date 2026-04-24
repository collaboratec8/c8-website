import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().default('Strategy'),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    readTime: z.number().int().positive().default(5),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    cover: z.enum(['three-numbers', 'customer-margin', 'hire-ramp']).optional(),
  }),
});

export const collections = { blog };
