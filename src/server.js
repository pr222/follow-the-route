/**
 * Main application.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import hbs from 'express-hbs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'

// Create the instance of the app.
const app = express()
const directoryFullName = dirname(fileURLToPath(import.meta.url))

// A morgan logger with the dev-format.
app.use(morgan('dev'))

// Set up view engine.
app.engine('hbs', hbs.express4({
  defaultLayout: join(directoryFullName, 'views', 'layouts', 'default')
}))
app.set('view engine', 'hbs')
// Catalog with all views
app.set('views', join(directoryFullName, 'views'))

// Request object to a body object, req.body with form data.
app.use(express.urlencoded({ extended: false }))

// Static files
app.use(express.static(join(directoryFullName, '..', 'public')))

// Routes
// app.use('/', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Let the HTTP server start listening for connections.
app.listen(process.env.PORT, () => {
  console.log(`The server is now running at http://localhost:${process.env.PORT}`)
  console.log('Press Ctrl+C to terminate.')
})
