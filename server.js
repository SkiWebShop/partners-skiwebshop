const express = require('express')
const app = express()
const {resolve} = require('path')

app.use(express.static(resolve('./dist')))

app.use('*', (req, res) => {
    res.sendFile(resolve('./dist/index.html'))
})

const port = process.env.PORT || 3000

app.listen(port, () =>{
    console.log(`Listening on port:${port}`)
})