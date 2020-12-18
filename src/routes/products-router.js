/**
 * Tasks routes.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import express from 'express'
import { ProductsController } from '../controllers/products-controller.js'

export const router = express.Router()

const controller = new ProductsController()

// Map HTTP verbs and route paths to controller actions.
router.get('/', controller.index)

router.get('/new', controller.new)
router.post('/create', controller.create)

router.get('/:id', controller.show)
