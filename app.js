
import fs from 'fs'
import express from 'express'
import { PORT } from './config.js'

const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use('/favicon.ico', express.static('views/favicon.ico'))

app.get('/palabra/:c1/:c2', (req, res) => {

    //const expr = /\w[b]\w[v]/g; // se indica los caracteres que debe tener la palabra.
    const read = fs.readFileSync('lemario.txt', 'utf-8')

    const { c1, c2 } = req.params

    if (c1 && c2) {
        const letter1 = c1
        const letter2 = c2

        const regexp = new RegExp(('\\w' + letter1 + '\\w' + letter2), 'g')
        const words = read.split('\n').slice(2).filter(texts => { // para determinar muestre la palabra con las letras elecciónadas
            if (texts.match(regexp)) {
                return texts
            }
        })
        const palabra = words[Math.floor(Math.random() * words.length)]
        return res.render('index', { palabra, letter1, letter2 })
    }
    return res.status(404)
})

app.post('/palabra', (req, res) => {

    const { value } = req.body
    const readCompare = fs.readFileSync('lemario.txt', 'utf-8').split('\n').slice(2)
    const wordCompare = readCompare.find(text => text.toLowerCase() === value.toLowerCase())
    if (wordCompare) return res.json(wordCompare)
    return res.status(404).json('Not found')

})


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})


