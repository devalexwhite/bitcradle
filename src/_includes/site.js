import path from 'node:path';

const github = 'https://github.com/devalexwhite';
const xAccount = 'https://x.com/MeetAlexAWhite';

export function escape(value) {
  return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

// Relative URLs also let the built site run from a subdirectory or an offline copy.
export function links(pageUrl) {
  return target => {
    const file = target.endsWith('/') ? target + 'index.html' : target;
    return path.posix.relative(pageUrl, file) || 'index.html';
  };
}

const paths = {
  folder: '<path d="M1 4h6l2 2h6v8H1z M2 7h12" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  github: '<path fill="currentColor" d="M8 .6a7.45 7.45 0 0 0-2.36 14.52c.38.07.51-.16.51-.36v-1.4c-2.08.46-2.52-.88-2.52-.88-.34-.86-.83-1.09-.83-1.09-.68-.46.05-.45.05-.45.75.05 1.14.77 1.14.77.67 1.15 1.75.82 2.18.63.07-.49.26-.82.47-1.01-1.66-.19-3.41-.83-3.41-3.69 0-.81.29-1.48.77-2-.08-.19-.33-.95.08-1.97 0 0 .63-.2 2.05.76a7.2 7.2 0 0 1 3.74 0c1.42-.96 2.04-.76 2.04-.76.41 1.02.16 1.78.08 1.97.48.52.77 1.19.77 2 0 2.87-1.75 3.5-3.42 3.69.27.23.51.69.51 1.39v2.04c0 .2.13.43.52.36A7.45 7.45 0 0 0 8 .6Z"/>',
  x: '<path d="M2 2h3.3L14 14h-3.3z M13.3 2 2.6 14" fill="none" stroke="currentColor" stroke-width="1.35"/>',
};

export function icon(name) {
  return `<svg class="icon" aria-hidden="true" focusable="false" viewBox="0 0 16 16">${paths[name]}</svg>`;
}

export const dateLabel = date => new Intl.DateTimeFormat('en-US', {
  month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC'
}).format(new Date(date + 'T00:00:00Z'));

export function shell({ title, description, section, url, body }) {
  const link = links(url);
  const nav = [['Home', '/'], ['Projects', '/#projects'], ['Blog', '/blog/']].map(([name, target]) => {
    const href = target === '/#projects' ? link('/') + '#projects' : link(target);
    const active = section === name;
    return `<a href="${href}" ${active ? 'class="current" aria-current="' + (name === 'Projects' || (name === 'Blog' && url !== '/blog/') ? 'location' : 'page') + '"' : ''}>${name}</a>`;
  }).join('');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(title)}</title><meta name="description" content="${escape(description)}">
  <meta name="theme-color" content="#eeeee5">
  <link rel="icon" type="image/svg+xml" href="${link('/assets/brand/mark-light.svg')}">
  <link rel="stylesheet" href="${link('/assets/site.css')}">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="masthead"><div class="wrap mast-inner">
    <a class="identity" href="${link('/')}" aria-label="Bitcradle home"><img class="brand-mark" src="${link('/assets/brand/mark-light.svg')}" alt=""><img class="wordmark" src="${link('/assets/brand/wordmark-light.svg')}" alt="Bitcradle"></a>
    <nav aria-label="Main navigation">${nav}</nav>
    <div class="profiles"><a href="${github}" aria-label="GitHub profile">${icon('github')}<span>GitHub</span></a><a href="${xAccount}" aria-label="Alex A. White on X">${icon('x')}</a></div>
  </div></header>
  <main id="main" class="wrap">${body}</main>
  <footer><div class="wrap footer-inner"><span>Bitcradle <span class="divider">/</span> Alex A. White</span><div><a href="${github}">GitHub</a><a href="${xAccount}">@MeetAlexAWhite</a></div></div></footer>
</body></html>`;
}

export function postsList(posts, link, heading = 'h3') {
  return `<ul class="entries">${posts.map(post => `<li><a href="${link('/blog/' + post.slug + '/')}"><time datetime="${post.date}">${dateLabel(post.date)}</time><div><${heading}>${escape(post.title)}</${heading}><p>${escape(post.summary)}</p></div></a></li>`).join('')}</ul>`;
}
