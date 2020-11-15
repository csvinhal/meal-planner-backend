import { connect, set } from 'mongoose'
import config from './../config'

set('useCreateIndex', true)
connect(config.databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connected to db')
})
