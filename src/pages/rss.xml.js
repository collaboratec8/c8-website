import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: 'C8 Journal',
    description: 'Plain-English writing on SME finance — cash flow, pricing, hiring, fundraising, forecasting. From Ish Mukit, ACCA.',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.slug}/`,
      categories: [post.data.category],
      author: 'ish@collaboratec8.com (Ish Mukit)',
    })),
    customData: `<language>en-gb</language><copyright>© ${new Date().getFullYear()} Collaborate C8 Ltd</copyright>`,
  });
}
