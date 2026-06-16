/**
 * One-time / repeatable patch: favicon, meta, site-common.css, load-header-footer.js
 * Run: node scripts/apply-site-enhancements.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const skipFiles = new Set(['includes/header.html', 'includes/footer.html']);

const pageKeywords = {
  'index.html': 'Sri Takshashila Gurukul, education NGO, student empowerment, India nonprofit',
  'about-us.html': 'about us, Sri Takshashila Gurukul, mission, vision, trustees',
  'donate.html': 'donate, sponsor a child, education donation, Razorpay, NGO India',
  'contact-us.html': 'contact, Sri Takshashila Gurukul, get in touch, support',
  'gallery.html': 'gallery, photos, programs, workshops, community events',
  'get-involved.html': 'volunteer, participate, get involved, community',
  'ourprograms.html': 'programs, education initiatives, student programs',
  'vision.html': 'vision, mission, values, Sri Takshashila Gurukul',
  'team.html': 'team, leadership, trustees, staff',
  'thankyou.html': 'thank you, donation confirmation',
  'login.html': 'login, student portal',
  'subscribe.html': 'newsletter, subscribe, updates',
  'csrpage.html': 'CSR, corporate social responsibility, partnerships',
  'collaborations.html': 'collaborations, partners, NGOs',
  'coming-soon.html': 'coming soon, Sri Takshashila Gurukul',
  'learn.html': 'learn, guidance, student learning',
  'KalpavrukshaProgram.html': 'Kalpavruksha, program, education',
  'Impactcatalyst.html': 'impact catalyst, student guidance, skills',
  'SustainableCommunities.html': 'sustainable communities, rural education',
  'career aspiration.html': 'career aspiration, career quiz, students India',
  'participate.html': 'participate, get involved',
};

function getDescription(html) {
  const m = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)
    || html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
  return m ? m[1].trim() : '';
}

function getTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].trim() : 'Sri Takshashila Gurukul';
}

function patchHtml(filePath, relName) {
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (!html.includes('site-common.css')) {
    const cssLink = '  <link rel="stylesheet" href="css/site-common.css" />\n';
    if (html.includes('rel="icon"')) {
      html = html.replace(/(<link rel="icon"[^>]*>\s*\n)/i, '$1' + cssLink);
    } else if (html.includes('<title>')) {
      html = html.replace(/(<title>[^<]*<\/title>\s*\n)/i, '$1' + cssLink);
    } else {
      html = html.replace(/(<meta name="viewport"[^>]*>\s*\n)/i, '$1' + cssLink);
    }
    changed = true;
  }

  if (!html.includes('apple-touch-icon')) {
    html = html.replace(
      /<link rel="icon" href="Assests\/Logo\.png"\s*\/?>/gi,
      `<link rel="icon" href="Assests/Logo.png" type="image/png" />
  <link rel="shortcut icon" href="Assests/Logo.png" type="image/png" />
  <link rel="apple-touch-icon" href="Assests/Logo.png" />`
    );
    changed = true;
  }

  if (!html.includes('name="author"')) {
    const block = `  <meta name="author" content="Sri Takshashila Gurukul" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0f3d91" />
`;
    if (html.includes('name="description"')) {
      html = html.replace(
        /(<meta\s+name=["']description["'][^>]*>\s*\n)/i,
        '$1' + block
      );
    } else {
      const desc = pageKeywords[relName]
        ? `Sri Takshashila Gurukul — ${relName.replace('.html', '').replace(/-/g, ' ')}`
        : 'Sri Takshashila Gurukul — Empowering students through education.';
      const descMeta = `  <meta name="description" content="${desc}" />\n`;
      html = html.replace(/(<meta name="viewport"[^>]*>\s*\n)/i, `$1${descMeta}${block}`);
      changed = true;
    }
    changed = true;
  }

  if (!html.includes('property="og:title"')) {
    const title = getTitle(html);
    const desc = getDescription(html) || 'Sri Takshashila Gurukul — Empowering students through education, awareness, and technology.';
    const keywords = pageKeywords[relName] || 'Sri Takshashila Gurukul, education, students, India';
    const ogImage = relName === 'donate.html' ? 'images/bannardonate.jpg' : 'Assests/Logo.png';

    let ogBlock = '';
    if (!html.includes('name="keywords"')) {
      ogBlock += `  <meta name="keywords" content="${keywords}" />\n`;
    }
    ogBlock += `  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Sri Takshashila Gurukul" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:url" content="${relName}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="${ogImage}" />
`;

    if (html.includes('name="theme-color"')) {
      html = html.replace(
        /(<meta name="theme-color"[^>]*>\s*\n)/i,
        '$1' + ogBlock
      );
    } else if (html.includes('<title>')) {
      html = html.replace(/(<title>[^<]*<\/title>\s*\n)/i, '$1' + ogBlock);
    }
    changed = true;
  }

  const hasHeader = html.includes('id="site-header"');
  const hasFooter = html.includes('id="site-footer"');
  if ((hasHeader || hasFooter) && !html.includes('load-header-footer.js')) {
    html = html.replace(
      /<\/body>/i,
      '  <script src="includes/load-header-footer.js"></script>\n</body>'
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Updated:', relName);
  } else {
    console.log('Skipped (already patched):', relName);
  }
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const rel = path.relative(root, path.join(dir, name)).replace(/\\/g, '/');
    if (skipFiles.has(rel)) continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (name === 'node_modules' || name === 'scripts') continue;
      walk(full);
    } else if (name.endsWith('.html')) {
      patchHtml(full, rel);
    }
  }
}

walk(root);
console.log('Done.');
