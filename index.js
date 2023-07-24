const fs = require('node:fs')
const path = require('node:path')
// Ejercicio 2
async function writeFile(filePath, data, callback) {
  const dirPath = path.dirname(filePath)
  try {
    await fs.promises.mkdir(dirPath, { recursive: true })
    await fs.promises.writeFile(filePath, data)
    callback()
  } catch (err) {
    callback(err)
  }
}


// Ejercicio 3
async function readFileAndCount(word, callback) {
  if (!word) {
    const error = new Error('No se ha especificado la palabra a buscar')
    return callback(error)
  }
  const filePath = process.argv[2]
  if (!filePath) {
    const error = new Error('No se ha especificado el path del archivo')
    return callback(error)
  }

 try {
    await fs.promises.access(filePath, fs.constants.F_OK)
    const content = await fs.promises.readFile(filePath, 'utf-8')
    const existWord = (content.match(new RegExp(word, 'gi')) || []).length
    callback(null,existWord)
  } catch (err) {
    if (err.code === 'ENOENT') {
      callback(null,0) 
    }else{
      callback(err)
    }
  }
}

module.exports = {
  writeFile,
  readFileAndCount
}