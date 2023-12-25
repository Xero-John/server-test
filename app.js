const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.json({
    message: 'Hello!',
  })
})
app.get('/account', (req, res) => {
  res.json({
    message: 'account!',
  })
})
app.get('/thanks', (req, res) => {
  res.json({
    message: 'thanks!',
  })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
