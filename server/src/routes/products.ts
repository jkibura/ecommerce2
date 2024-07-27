import { Router } from 'express'
import {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/products'
import { checkAuth , checkRole } from '../middleware/checks'

const router = Router()

router.get('/', getAllProducts)
router.get('/:id', getSingleProduct)
router.post('/', checkAuth, checkRole(['admin']), createProduct)
router.patch('/:id', checkAuth, checkRole(['admin']), updateProduct)
router.delete('/:id', checkAuth, checkRole(['admin']), deleteProduct)


export { router as productsRouter }