/**
 * Module for the TasksController.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

// "Faking" persistent products.
// const products = [{ id: 1, name: 'Phone' }]
const products = [
  { id: 1, name: 'storm kitchen' },
  { id: 2, name: 'cell box' },
  { id: 3, name: 'recycled garments' },
  { id: 4, name: 'electric bike' },
  { id: 5, name: 'VR glasses' }
]

/**
 * Encapsulates a controller.
 */
export class ProductsController {
  /**
   * Displays a list of products.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const viewData = { products }
      res.render('products/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Displays a product.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async show (req, res, next) {
    // Get the first product that's id equals the parameter id's value.
    const product = products
      .filter(product => product.id === Number(req.params.id))
      .shift()

    // If no product is found send a 404 (resource not found).
    if (!product) {
      const error = new Error('Not Found')
      error.statusCode = 404

      // IMPORTANT! Never throw an exception in an async action handler,
      // always call next!
      next(error)
      return
    }

    // Send response with the wanted product.
    const viewData = { product }
    res.render('products/show', { viewData })
  }

  /**
   * Returns a HTML form for creating a new product.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async new (req, res, next) {
    try {
      res.render('products/new')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new product.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async create (req, res, next) {
    try {
      // Make the product "persistent" and...
      products.push({
        id: products.length + 1,
        name: req.body.name
      })

      // ...redirect to the list of products.
      res.redirect('.')
    } catch (error) {
      next(error)
    }
  }
}
