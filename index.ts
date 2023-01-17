import express from 'express'
import v1 from './routes/v1/index.js'

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('Hello World')
})

app.use('/v1', v1)

app.listen(3000, () => {
  console.log('Server is running')
})