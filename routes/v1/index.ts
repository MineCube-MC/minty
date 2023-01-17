import express from 'express'
import { epicfreegames } from './epicfreegames.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('Welcome to the first iteration of the Minty API!')
})

router.use('/epicfreegames', epicfreegames)

export default router