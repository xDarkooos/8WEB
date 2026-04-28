const http = require('http');
const fs = require('fs');
const url = require('url');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/file') {
        const fileName = parsedUrl.query.fileName;

        // якщо немає fileName
        if (!fileName) {
            res.writeHead(400);
            return res.end('Missing fileName');
        }

        // перевірка існування файлу
        if (!fs.existsSync(fileName)) {
            res.writeHead(400);
            return res.end('File not found');
        }

        // стрім файлу
        const stream = fs.createReadStream(fileName);

        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        });

        stream.pipe(res);

        // обробка помилки стріму
        stream.on('error', () => {
            res.writeHead(500);
            res.end('Stream error');
        });

    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});