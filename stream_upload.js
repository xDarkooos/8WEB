const http = require('http');
const fs = require('fs');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {

    if (req.method === 'POST' && req.url === '/upload') {
        
        // створюємо write stream
        const writeStream = fs.createWriteStream('upload.txt');

        // пишемо запит одразу у файл
        req.pipe(writeStream);

        // коли запис завершено
        writeStream.on('finish', () => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('OK');
        });

        // обробка помилки
        writeStream.on('error', () => {
            res.writeHead(500);
            res.end('File write error');
        });

    } else {
        res.writeHead(404);
        res.end();
    }

});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});