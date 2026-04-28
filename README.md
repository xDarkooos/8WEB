Запуск рішень

Відкрити термінал у папці з файлами проєкту і запустити потрібний файл командою: node <назва_файлу>.js <порт>
Приклад: node stream_response.js 3000 або node stream_upload.js 3000

Перевірити роботу через curl.
Для отримання файлу: curl -i "http://localhost:3000/file?fileName=file.txt"

Для завантаження через стрім:
curl -X POST http://localhost:3000/upload
 -H "Content-Type: text/plain" --data-binary "example text"

Для трансформації тексту у верхній регістр:
curl -i "http://localhost:3000/upper?fileName=file.txt"

Для підрахунку байтів і чанків:
curl -X POST http://localhost:3000/count
 --data-binary "hello world"

Для перевірки обробки помилок:
curl -i "http://localhost:3000/missing-file?fileName=test.txt"

Виконані вправи:
STREAM FILE TO RESPONSE
Файл: stream_response.js
Маршрут: /file
Зчитує файл з диска за допомогою стріму та передає його в HTTP-відповідь.

STREAM UPLOAD
Файл: stream_upload.js
Маршрут: /upload
Приймає дані запиту як стрім і записує їх у файл upload.txt.

STREAM TRANSFORM
Файл: stream_transform.js
Маршрут: /upper
Зчитує файл як стрім, перетворює весь текст у верхній регістр і повертає результат.

STREAM COUNTER
Файл: stream_counter.js
Маршрут: /count

Зчитує тіло запиту як стрім і підраховує кількість байтів та чанків, повертаючи результат у JSON.

STREAM ERRORS
Файл: stream_errors.js
Маршрут: /missing-file
Намагається зчитати файл через стрім, обробляє помилки та повертає безпечне повідомлення, не зупиняючи роботу сервера.
