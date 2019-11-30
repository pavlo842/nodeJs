// // Модуль path предназначен для работы с путями
// const path = require('path')

// // basename() - забирает абсолютный путь и отдает только файл из которого вызван
// console.log(path.basename(__filename))


// // dirname() - отдает название папки из которой вызван
// console.log(path.dirname(__filename))


// // extname() - отдает расширение файла из которого вызван
// console.log(path.extname(__filename))

// // Полная инфа. Можно работать как с обектом path.parse(__filename).base|root|ext|name|dir
// console.log(path.parse(__filename))


// // join() - соединяет(генерирует) пути в одну строку
// console.log(path.join(__dirname, 'test', 'second.html'))


// console.log(path.resolve(__dirname, 'test', 'second.html'))
