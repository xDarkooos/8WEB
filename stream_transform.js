const http = require('http');
const fs = require('fs');
const url = require('url');
const { Transform } = require('stream');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/upper') {
        const fileName = parsedUrl.query.fileName;

        // якщо немає fileName
        if (!fileName) {
            res.writeHead(400);
            return res.end('Missing fileName');
        }

        // якщо файл не існує
        if (!fs.existsSync(fileName)) {
            res.writeHead(400);
            return res.end('File not found');
        }

        // створюємо transform stream
        const upperCaseTransform = new Transform({
            transform(chunk, encoding, callback) {
                const upperChunk = chunk.toString().toUpperCase();
                callback(null, upperChunk);
            }
        });

        const readStream = fs.createReadStream(fileName);

        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        });

        // pipeline: file -> transform -> response
        readStream
            .pipe(upperCaseTransform)
            .pipe(res);

    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});