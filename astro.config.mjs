// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import rehypeExternalLinks from 'rehype-external-links';

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
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
  },
});