import { escape, icon, links, postsList, shell } from './_includes/site.js';
const link = links('/');

export default class Home {
  data() { return { permalink: 'index.html' }; }
  render({ projects, posts }) {
    const catalog = projects.map(project => `<a class="project-link" href="${link('/projects/' + project.slug + '/')}">
      <div class="app-art"><img width="116" height="84" src="${link('/assets/icons/' + project.slug + '.svg')}" alt=""></div>
      <h3>${escape(project.name)}</h3><p>${escape(project.short)}</p>
    </a>`).join('');
    return shell({
      title: 'Bitcradle — Palm OS hardware, still at work.',
      description: 'New apps, game ports, and J-Pilot HotSync conduits for Palm OS handhelds.',
      section: 'Home', url: '/',
      body: `<section class="hero" aria-labelledby="welcome">
        <div class="hero-pattern" aria-hidden="true"></div>
        <div class="hero-copy"><h1 id="welcome">Palm OS hardware,<br>still at work.</h1>
        <p>New apps, game ports, and J-Pilot HotSync conduits for the Palm in your pocket.</p>
        <div class="hero-actions"><a href="#projects" class="button">${icon('folder')}Browse projects</a><a href="${link('/blog/')}" class="text-link">Read the blog</a></div></div>
        <figure class="hero-device"><a class="device-back" href="${link('/projects/feeds-to-plucker/')}" aria-label="Explore Feeds to Plucker"><img src="${link('/assets/images/feeds-device.webp')}" width="580" height="900" alt="Plucker on a Palm Zire 71"></a><a class="device-front" href="${link('/projects/palmlatro/')}" aria-label="Explore Palmlatro"><img src="${link('/assets/images/palmlatro-device.webp')}" fetchpriority="high" width="582" height="786" alt="Palmlatro’s title screen framed in a Palm Tungsten T"></a><figcaption><span class="caption-line"></span>Zire 71 &amp; Tungsten T</figcaption></figure>
      </section>
      <section class="catalog" id="projects" aria-labelledby="projects-heading">
        <div class="section-title"><h2 id="projects-heading">Projects</h2><span class="rule"></span>${icon('folder')}</div>
        <div class="project-grid">${catalog}</div>
      </section>
      <section class="journal" aria-labelledby="blog-heading"><div class="section-title"><h2 id="blog-heading">From the blog</h2><span class="rule"></span><a class="text-link" href="${link('/blog/')}">All posts</a></div>${postsList(posts, link)}</section>`
    });
  }
}
