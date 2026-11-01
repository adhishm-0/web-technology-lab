Experiment 10: Developing Server-Side Application Using Node.js
Website reference: StarVerse (the website name used in Experiments 1–3).

Run the server
1. Install Node.js.
2. Open a terminal in this folder.
3. Run: node server.js
4. Open http://localhost:3000 in a browser.
5. Test the routes /home and /about.

The server uses Node.js's built-in http module. It responds to /, /home, and /about with a StarVerse page, and returns HTTP 404 for unknown routes. Each page shows the request URL and method.
