import express from 'express'
const app = express()

const port = 8000

const sessions = []

app.get('/', (req, res) => {
    console.log('Client connected')
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Access-Control-Allow-Origin', '*')

    res.write(`Hello client#${sessions.length}\n\n`)

    sessions.push(res)

    res.on('close', () => {
        console.log('A connection was closed')
        res.end()
    })    
})

app.get('/send', (req, res) => {
    console.log(`msg received: ${req.query.msg}`)
    if(req.query.msg)
        sessions.forEach(session => {
            session.write(req.query.msg + "\n\n")
        })
    res.json(null)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})