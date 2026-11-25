import { escape, icon, links, shell } from '../_includes/site.js';

const photoSource = 'https://github.com/ardiri/dev-palmos/blob/d25b066f0eb346253f49fc06f80a37bf9099c0ef/!dev_conferences/palmsource2003-seminar/03-licensee_session-palm_solutions.pdf';

export default class ProjectPage {
  data() {
    return { pagination: { data: 'projects', size: 1, alias: 'project' }, permalink: data => `projects/${data.project.slug}/index.html` };
  }
  render({ project }) {
    const url = '/projects/' + project.slug + '/';
    const link = links(url);
    const game = project.slug === 'palmlatro';
    const device = project.image;
    const artwork = device
      ? `<img class="device" src="${link('/assets/images/' + device.file)}" alt="${escape(device.alt)}"><figcaption>${escape(device.caption)}</figcaption>`
      : `<img class="project-icon" src="${link('/assets/icons/' + project.slug + '.svg')}" alt="">`;
    const gallery = game ? `<section class="gallery"><h2>At the table</h2>
      <figure class="game-shot"><img src="${link('/assets/images/palmlatro-scoring-device.webp')}" loading="lazy" width="582" height="786" alt="Palmlatro’s scoring screen, with the playing cards across the bottom of a Palm Tungsten T display">
      <figcaption><p>A hand in play</p><span class="figure-caption">Game screenshot in a Tungsten T frame.</span><small>Device photograph from <a href="${photoSource}">Palm Solutions Group</a>.</small></figcaption></figure></section>` : '';
    return shell({ title: project.name + ' · Bitcradle', description: project.description, section: 'Projects', url,
      body: `<article class="project-page"><a class="crumb" href="${link('/')}#projects">All projects</a>
        <header class="project-mast"><div class="project-intro"><h1>${escape(project.name)}</h1><p>${escape(project.description)}</p>
        <a class="button" href="${escape(project.github)}">${icon('github')}View on GitHub</a></div>
        <figure class="project-visual">${artwork}</figure></header>
        <div class="project-body"><section class="body-copy"><h2>How it works</h2>${project.details.map(item => `<p>${escape(item)}</p>`).join('')}</section>
        <section class="body-copy"><h2>Get started</h2><p>${escape(project.install)}</p><a class="text-link" href="${escape(project.github)}#readme">Project README</a></section></div>${gallery}</article>` });
  }
}
