import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
const port = 3000

app.use(morgan('dev'))
app.use(cors())

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
)
