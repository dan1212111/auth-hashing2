require('dotenv').config();

const express = require("express")
const morgan = require("morgan")
const cors = require('cors')
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.disable('x-powered-by');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = require('./router')
app.use('/', router);

app.get('*', (req, res) => {
  res.json({ ok: true})
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`\n Server is running on http://localhost:${port}\n`)
})
