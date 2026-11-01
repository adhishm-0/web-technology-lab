const http = require('http');

const PORT = 3000;
const routes = {
  '/': { title: 'Welcome to StarVerse!', message: 'This is a server-side application.' },
  '/home': { title: 'Welcome home to StarVerse!', message: 'Explore your astrology and horoscope experience.' },
  '/about': { title: 'About StarVerse', message: 'StarVerse is an astrology and horoscope website.' }
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function createPage(req, route, content, status) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(content.title)} | StarVerse</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 28px; color: #172554; background: #f5f7fb; font: 16px/1.6 Arial, sans-serif; }
    main { width: min(700px, 100%); padding: 52px; border: 1px solid #e3e8f1; border-radius: 20px; background: #fff; box-shadow: 0 20px 60px #1e315012; }
    .brand { color: #314d91; font-size: 14px; font-weight: 700; letter-spacing: .14em; }
    .eyebrow { margin-top: 44px; color: #7b88a3; font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
    h1 { margin: 8px 0 12px; font-size: clamp(32px, 6vw, 48px); line-height: 1.1; }
    .message { margin: 0 0 28px; color: #61708d; font-size: 18px; }
    .request { padding-top: 18px; border-top: 1px solid #e8ebf2; color: #5c6880; font-size: 14px; }
    .request p { margin: 5px 0; } .request strong { color: #253967; }
    nav { display: flex; gap: 12px; margin-top: 24px; } nav a { color: #314d91; font-weight: 700; text-decoration: none; }
    nav a:hover { text-decoration: underline; }
    @media (max-width: 540px) { main { padding: 30px 24px; } .eyebrow { margin-top: 32px; } }
  </style>
</head>
<body>
  <main>
    <div class="brand">✦ STARVERSE</div>
    <div class="eyebrow">Node.js HTTP Server · ${escapeHtml(route)}</div>
    <h1>${escapeHtml(content.title)}</h1>
    <p class="message">${escapeHtml(content.message)}</p>
    <div class="request">
      <p><strong>Request URL:</strong> ${escapeHtml(req.url)}</p>
      <p><strong>Request Method:</strong> ${escapeHtml(req.method)}</p>
      <p><strong>Response Status:</strong> ${status} ${status === 200 ? 'OK' : 'Not Found'}</p>
    </div>
    <nav><a href="/home">Home</a><a href="/about">About</a></nav>
  </main>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  const path = new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname;
  const page = routes[path];
  const status = page ? 200 : 404;
  const content = page || { title: 'Page not found', message: 'The requested StarVerse page does not exist.' };

  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(createPage(req, path, content, status));
});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
