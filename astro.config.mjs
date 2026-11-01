// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import rehypeExternalLinks from 'rehype-external-links';
import { unified } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
	adapter: cloudflare({
		imageService: 'compile',
	}),
  redirects: {
    '/projects/tetraminos': '/projects/codonandon',
    '/tech/application-programming-interface-api': '/tech/api',
    '/tech/javascript-object-notation-json': '/tech/json',
    '/tech/asynchronous-javascript-and-xml-ajax': '/tech/ajax',
  },
	markdown: {
    processor: unified({
      rehypePlugins: [
        [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      ],
    }),
  },
  // Astro 7 changed the default to 'jsx', which can remove spaces between
  // inline elements; keep Astro 6's behaviour.
  compressHTML: true,
});