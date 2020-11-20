import fs from 'fs'
import path from 'path'
import config from '../config'

const cleanDirectory = () => {
  const directory = config.uploadDest

  fs.readdir(directory, (err: any, files: any) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err: any) => {
        if (err) throw err
      })
    }
  })
}

export { cleanDirectory }
