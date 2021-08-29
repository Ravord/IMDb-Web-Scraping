const express = require('express')
const app = express()

const { getBasicInfo } = require('./IMDb.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res, next) => {
  if (!req.body.link) {
    return res.status(400).json({ msg: 'no link given' })
  }
  getBasicInfo(req.body.link)
    .then((data) => {
      return res.json(data)
    })
    .catch((err) => {
      return res.status(404).json({ msg: 'entry not found' })
    })
})
app.listen(process.env.PORT || 5000, () => {
  console.log(`App is now running on port ${process.env.PORT || 5000}`)
})