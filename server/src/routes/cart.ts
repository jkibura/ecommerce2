import { Router } from 'express'
import { getCart, addToCart, updateCart, removeFromCart } from '../controllers/cart'
import { checkAuth } from '../middleware/checks'

const router = Router()

router.post('/', checkAuth, addToCart)
router.get('/', checkAuth, getCart)
router.patch('/', checkAuth, updateCart)
router.delete('/', checkAuth, removeFromCart)

export { router as cartRouter }