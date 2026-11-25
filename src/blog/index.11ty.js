import { links, postsList, shell } from '../_includes/site.js';

export default class Blog {
  data() { return { permalink: 'blog/index.html' }; }
  render({ posts }) {
    return shell({ title: 'Blog · Bitcradle', description: 'Notes on building and using Palm OS software.', section: 'Blog', url: '/blog/',
      body: `<div class="listing"><h1>Blog</h1><p class="intro">Notes from the workbench.</p>${postsList(posts, links('/blog/'), 'h2')}</div>` });
  }
}
