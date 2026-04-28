const http = require('http');
const fs = require('fs');
const url = require('url');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/missing-file') {
        const fileName = parsedUrl.query.fileName;

        // якщо немає fileName
        if (!fileName) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            return res.end('Missing fileName');
        }

        const stream = fs.createReadStream(fileName);

        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        });

        // якщо файл існує — просто стрімимо
        stream.pipe(res);

        // 🔴 ОБРОБКА ПОМИЛКИ
        stream.on('error', () => {
            // важливо: не падати, а відповісти 500
            if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
            }
            res.end('Internal Server Error');
        });

    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});