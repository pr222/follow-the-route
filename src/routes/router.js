/**
 * The routes.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import express from 'express'
import { router as productsRouter } from './products-router.js'

export const router = express.Router()

router.use('/products', productsRouter)

router.use('*', (req, res, next) => {
  const error = new Error()
  error.status = 404
  error.message = 'Not Found'
  next(error)
})
