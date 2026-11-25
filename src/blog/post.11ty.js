import { dateLabel, escape, links, shell } from '../_includes/site.js';

export default class PostPage {
  data() {
    return { pagination: { data: 'posts', size: 1, alias: 'post' }, permalink: data => `blog/${data.post.slug}/index.html` };
  }
  render({ post, projects }) {
    const url = '/blog/' + post.slug + '/';
    const link = links(url), project = projects.find(item => item.slug === post.project);
    return shell({ title: post.title + ' · Bitcradle', description: post.summary, url, section: 'Blog',
      body: `<article class="article"><a class="text-link" href="${link('/blog/')}">All posts</a><header><h1>${escape(post.title)}</h1><time datetime="${post.date}">${dateLabel(post.date)}</time></header>
        ${post.paragraphs.map(paragraph => `<p>${escape(paragraph)}</p>`).join('')}
        <div class="post-end"><img src="${link('/assets/icons/' + project.slug + '.svg')}" alt=""><a class="text-link" href="${link('/projects/' + project.slug + '/')}">Explore ${escape(project.name)}</a></div></article>` });
  }
}
