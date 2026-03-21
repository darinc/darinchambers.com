/**
 * Build-time prerendering script.
 *
 * Runs after `vite build` to inject semantic HTML into static pages so that
 * bots and AI crawlers can access real content while human visitors still get
 * the full terminal experience.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const CONTENT = path.join(ROOT, 'src', 'content');
const SITE_URL = 'https://darinchambers.com';

// ---------------------------------------------------------------------------
// Frontmatter parser (lightweight, replicates BlogParser / PortfolioParser)
// ---------------------------------------------------------------------------

function parseFrontmatter(raw) {
  const lines = raw.split('\n');
  if (lines[0].trim() !== '---') return { meta: {}, body: raw };

  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      endIndex = i;
      break;
    }
  }
  if (endIndex === -1) return { meta: {}, body: raw };

  const meta = {};
  for (let i = 1; i < endIndex; i++) {
    const line = lines[i];
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    // Strip surrounding quotes
    if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
      value = value.slice(1, -1);
    }
    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => {
          s = s.trim();
          if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
            s = s.slice(1, -1);
          }
          return s;
        })
        .filter(Boolean);
    }
    meta[key] = value;
  }

  const body = lines.slice(endIndex + 1).join('\n').trim();
  return { meta, body };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readFile(p) {
  return fs.readFileSync(p, 'utf-8');
}

function writeFileSafe(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf-8');
}

function blogSlug(filename) {
  // 2025-11-14-a-love-letter... → a-love-letter...
  return filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function renderMarkdown(md) {
  return marked.parse(md);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------------------
// Template manipulation
// ---------------------------------------------------------------------------

function injectMeta(template, { title, description, url, type, jsonLd }) {
  let result = template;

  // Replace existing <title> with per-page title
  result = result.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);

  // Replace existing <meta name="description"> with per-page description
  result = result.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${escapeHtml(description)}">`
  );

  // Replace existing OG tags with per-page values
  result = result.replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${type || 'website'}">`);
  result = result.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}">`);
  result = result.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(title)}">`);
  result = result.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(description)}">`);

  // Replace existing Twitter tags with per-page values
  result = result.replace(/<meta name="twitter:url"[^>]*>/, `<meta name="twitter:url" content="${url}">`);
  result = result.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(title)}">`);
  result = result.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(description)}">`);

  // Inject canonical link and JSON-LD before </head>
  const extras = [
    `  <link rel="canonical" href="${url}">`,
    jsonLd ? `  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : '',
  ]
    .filter(Boolean)
    .join('\n');

  result = result.replace('</head>', `${extras}\n</head>`);

  return result;
}

function injectContent(template, html) {
  const section = `<section class="seo-content" aria-hidden="true">\n${html}\n</section>\n  `;
  return template.replace('<body>\n  <header', `<body>\n  ${section}<header`);
}

function buildPage(template, { title, description, url, type, jsonLd, contentHtml }) {
  let page = injectMeta(template, { title, description, url, type, jsonLd });
  page = injectContent(page, contentHtml);
  return page;
}

// ---------------------------------------------------------------------------
// JSON-LD helpers
// ---------------------------------------------------------------------------

function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Darin Chambers',
    jobTitle: 'Technologist, Inventor',
    description: 'Building What\'s Next on Rock-Solid Foundations',
    url: SITE_URL,
    sameAs: [
      'https://www.linkedin.com/in/darinchambers',
      'https://github.com/darinc',
    ],
  };
}

function blogPostingSchema(meta, slug) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    datePublished: meta.date,
    author: { '@type': 'Person', name: 'Darin Chambers' },
    description: meta.summary || '',
    keywords: Array.isArray(meta.tags) ? meta.tags.join(', ') : '',
    url: `${SITE_URL}/blog/${slug}`,
  };
}

function blogListSchema(posts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Darin Chambers Blog',
    url: `${SITE_URL}/blog`,
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.meta.title,
      datePublished: p.meta.date,
      url: `${SITE_URL}/blog/${p.slug}`,
    })),
  };
}

function creativeWorkSchema(meta, slug) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: meta.title,
    description: meta.summary || meta.impact || '',
    author: { '@type': 'Person', name: 'Darin Chambers' },
    keywords: Array.isArray(meta.tags) ? meta.tags.join(', ') : '',
    url: `${SITE_URL}/portfolio/${slug}`,
  };
}

function collectionPageSchema(label, items, basePath) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: label,
    url: `${SITE_URL}/${basePath}`,
    hasPart: items.map((i) => ({
      '@type': 'CreativeWork',
      name: i.meta.title,
      url: `${SITE_URL}/${basePath}/${i.slug}`,
    })),
  };
}

function contactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Darin Chambers',
    url: `${SITE_URL}/contact`,
  };
}

// ---------------------------------------------------------------------------
// Content discovery
// ---------------------------------------------------------------------------

function discoverBlogPosts() {
  const dir = path.join(CONTENT, 'blog');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .reverse()
    .map((f) => {
      const raw = readFile(path.join(dir, f));
      const { meta, body } = parseFrontmatter(raw);
      return { filename: f, slug: blogSlug(f), meta, body };
    });
}

function discoverPortfolioProjects() {
  const dir = path.join(CONTENT, 'portfolio');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = readFile(path.join(dir, f));
      const { meta, body } = parseFrontmatter(raw);
      const slug = meta.id || f.replace(/\.md$/, '');
      return { filename: f, slug, meta, body };
    });
}

function discoverNotes() {
  const dir = path.join(CONTENT, 'posts');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .reverse()
    .map((f) => {
      const raw = readFile(path.join(dir, f));
      const { meta, body } = parseFrontmatter(raw);
      const slug = f.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-(\d{2}-)?/, '');
      return { filename: f, slug, meta, body };
    });
}

// ---------------------------------------------------------------------------
// Page generators
// ---------------------------------------------------------------------------

function generateAboutPage(template) {
  const raw = readFile(path.join(CONTENT, 'about.md'));
  const contentHtml = renderMarkdown(raw);
  const page = buildPage(template, {
    title: 'Darin Chambers - Technologist, Inventor',
    description: 'Technologist, Inventor | Building What\'s Next on Rock-Solid Foundations. 30+ years of experience in software engineering, AI, and distributed systems.',
    url: `${SITE_URL}/about`,
    jsonLd: personSchema(),
    contentHtml,
  });
  writeFileSafe(path.join(DIST, 'about', 'index.html'), page);

  // Also enrich the root index.html with about content
  const rootPage = buildPage(template, {
    title: 'Darin Chambers - Technologist, Inventor',
    description: 'Technologist, Inventor | Building What\'s Next on Rock-Solid Foundations. 30+ years of experience in software engineering, AI, and distributed systems.',
    url: SITE_URL,
    jsonLd: personSchema(),
    contentHtml,
  });
  writeFileSafe(path.join(DIST, 'index.html'), rootPage);
}

function generateBlogPages(template) {
  const posts = discoverBlogPosts();

  // Individual post pages
  for (const post of posts) {
    const contentHtml = renderMarkdown(post.body);
    const page = buildPage(template, {
      title: `${post.meta.title} - Darin Chambers`,
      description: post.meta.summary || post.meta.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: 'article',
      jsonLd: blogPostingSchema(post.meta, post.slug),
      contentHtml,
    });
    writeFileSafe(path.join(DIST, 'blog', post.slug, 'index.html'), page);
  }

  // Blog listing page
  const listHtml = [
    '<h1>Blog</h1>',
    '<ul>',
    ...posts.map(
      (p) =>
        `<li><a href="/blog/${p.slug}">${escapeHtml(p.meta.title)}</a> <time datetime="${p.meta.date}">(${p.meta.date})</time><br>${escapeHtml(p.meta.summary || '')}</li>`
    ),
    '</ul>',
  ].join('\n');

  const listPage = buildPage(template, {
    title: 'Blog - Darin Chambers',
    description: 'Blog posts about AI, software engineering, and the craft of building software.',
    url: `${SITE_URL}/blog`,
    jsonLd: blogListSchema(posts),
    contentHtml: listHtml,
  });
  writeFileSafe(path.join(DIST, 'blog', 'index.html'), listPage);

  return posts;
}

function generatePortfolioPages(template) {
  const projects = discoverPortfolioProjects();

  for (const project of projects) {
    const contentHtml = renderMarkdown(project.body);
    const page = buildPage(template, {
      title: `${project.meta.title} - Darin Chambers`,
      description: project.meta.summary || project.meta.impact || project.meta.title,
      url: `${SITE_URL}/portfolio/${project.slug}`,
      jsonLd: creativeWorkSchema(project.meta, project.slug),
      contentHtml,
    });
    writeFileSafe(path.join(DIST, 'portfolio', project.slug, 'index.html'), page);
  }

  // Listing page
  const listHtml = [
    '<h1>Portfolio</h1>',
    '<ul>',
    ...projects.map(
      (p) =>
        `<li><a href="/portfolio/${p.slug}">${escapeHtml(p.meta.title)}</a> (${escapeHtml(p.meta.year || '')})<br>${escapeHtml(p.meta.summary || p.meta.impact || '')}</li>`
    ),
    '</ul>',
  ].join('\n');

  const listPage = buildPage(template, {
    title: 'Portfolio - Darin Chambers',
    description: 'Projects and accomplishments in software engineering, infrastructure, and AI.',
    url: `${SITE_URL}/portfolio`,
    jsonLd: collectionPageSchema('Portfolio', projects, 'portfolio'),
    contentHtml: listHtml,
  });
  writeFileSafe(path.join(DIST, 'portfolio', 'index.html'), listPage);

  return projects;
}

function generateNotesPages(template) {
  const notes = discoverNotes();

  for (const note of notes) {
    const contentHtml = renderMarkdown(note.body);
    const page = buildPage(template, {
      title: `${note.meta.title} - Darin Chambers`,
      description: note.meta.summary || note.meta.title || 'A note by Darin Chambers',
      url: `${SITE_URL}/notes/${note.slug}`,
      jsonLd: blogPostingSchema(note.meta, note.slug),
      contentHtml,
    });
    writeFileSafe(path.join(DIST, 'notes', note.slug, 'index.html'), page);
  }

  // Listing page
  const listItems =
    notes.length > 0
      ? notes.map(
          (n) =>
            `<li><a href="/notes/${n.slug}">${escapeHtml(n.meta.title || n.slug)}</a></li>`
        )
      : ['<li>No notes yet.</li>'];

  const listHtml = ['<h1>Notes</h1>', '<ul>', ...listItems, '</ul>'].join('\n');

  const listPage = buildPage(template, {
    title: 'Notes - Darin Chambers',
    description: 'Short-form notes and thoughts by Darin Chambers.',
    url: `${SITE_URL}/notes`,
    jsonLd: collectionPageSchema('Notes', notes, 'notes'),
    contentHtml: listHtml,
  });
  writeFileSafe(path.join(DIST, 'notes', 'index.html'), listPage);

  return notes;
}

function generateContactPage(template) {
  const raw = readFile(path.join(CONTENT, 'contact.md'));
  const contentHtml = renderMarkdown(raw);
  const page = buildPage(template, {
    title: 'Contact - Darin Chambers',
    description: 'Get in touch with Darin Chambers. Available via email and LinkedIn.',
    url: `${SITE_URL}/contact`,
    jsonLd: contactPageSchema(),
    contentHtml,
  });
  writeFileSafe(path.join(DIST, 'contact', 'index.html'), page);
}

function generateHelpPage(template) {
  const raw = readFile(path.join(CONTENT, 'help.md'));
  const contentHtml = renderMarkdown(raw);
  const page = buildPage(template, {
    title: 'Help - Darin Chambers Terminal',
    description: 'Interactive terminal help — available commands and features.',
    url: `${SITE_URL}/help`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Terminal Help', url: `${SITE_URL}/help` },
    contentHtml,
  });
  writeFileSafe(path.join(DIST, 'help', 'index.html'), page);
}

// ---------------------------------------------------------------------------
// Sitemap
// ---------------------------------------------------------------------------

function generateSitemap(blogPosts, portfolioProjects, notes) {
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'weekly', lastmod: today },
    { loc: '/about', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { loc: '/blog', priority: '0.9', changefreq: 'weekly', lastmod: today },
    ...blogPosts.map((p) => ({
      loc: `/blog/${p.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: p.meta.date || today,
    })),
    { loc: '/portfolio', priority: '0.8', changefreq: 'monthly', lastmod: today },
    ...portfolioProjects.map((p) => ({
      loc: `/portfolio/${p.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: today,
    })),
    { loc: '/notes', priority: '0.7', changefreq: 'weekly', lastmod: today },
    ...notes.map((n) => ({
      loc: `/notes/${n.slug}`,
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: n.meta.date || today,
    })),
    { loc: '/contact', priority: '0.6', changefreq: 'monthly', lastmod: today },
    { loc: '/help', priority: '0.4', changefreq: 'monthly', lastmod: today },
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (u) =>
        `  <url>\n    <loc>${SITE_URL}${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    ),
    '</urlset>',
  ].join('\n');

  writeFileSafe(path.join(DIST, 'sitemap.xml'), xml);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('[prerender] Starting build-time prerendering...');

  const template = readFile(path.join(DIST, 'index.html'));

  generateAboutPage(template);
  const blogPosts = generateBlogPages(template);
  const portfolioProjects = generatePortfolioPages(template);
  const notes = generateNotesPages(template);
  generateContactPage(template);
  generateHelpPage(template);
  generateSitemap(blogPosts, portfolioProjects, notes);

  const totalPages =
    2 + // root + about
    1 + blogPosts.length + // blog listing + posts
    1 + portfolioProjects.length + // portfolio listing + projects
    1 + notes.length + // notes listing + notes
    1 + // contact
    1; // help

  console.log(`[prerender] Generated ${totalPages} pages and sitemap.xml`);
  console.log('[prerender] Done.');
}

main();
