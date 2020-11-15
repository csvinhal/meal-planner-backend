import app from './src/app'
import config from './src/config'

const port = config.port
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
