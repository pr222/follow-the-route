/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import express from 'express'
import hbs from 'express-hbs'
import logger from 'morgan'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { router } from './routes/router.js'

const app = express()
const directoryFullName = dirname(fileURLToPath(import.meta.url))

// Set up a morgan logger using the dev format for log entries.
app.use(logger('dev'))

// View engine setup.
app.engine('hbs', hbs.express4({
  defaultLayout: join(directoryFullName, 'views', 'layouts', 'default'),
  partialsDir: join(directoryFullName, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', join(directoryFullName, 'views'))

// Parse requests of the content type application/x-www-form-urlencoded.
// Populates the request object with a body object (req.body).
app.use(express.urlencoded({ extended: false }))

// Serve static files.
app.use(express.static(join(directoryFullName, '..', 'public')))

// Register routes.
app.use('/', router)

// Error handler.
app.use(function (err, req, res, next) {
  // 404 Not Found.
  if (err.status === 404) {
    return res
      .status(404)
      .sendFile(join(directoryFullName, 'views', 'errors', '404.html'))
  }

  // 500 Internal Server Error (in production, all other errors send this response).
  if (req.app.get('env') !== 'development') {
    return res
      .status(500)
      .sendFile(join(directoryFullName, 'views', 'errors', '500.html'))
  }

  // Development only!
  // Only providing detailed error in development.

  // Render the error page.
  res
    .status(err.status || 500)
    .render('errors/error', { error: err })
})

// Starts the HTTP server listening for connections.
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
  console.log('Press Ctrl-C to terminate...')
})
