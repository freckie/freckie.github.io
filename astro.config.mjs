// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkFigureCaption from '@microflash/remark-figure-caption';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.frec.kr',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkGfm, remarkMath, remarkFigureCaption],
    rehypePlugins: [rehypeKatex],
  },
});