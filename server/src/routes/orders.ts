import { Router } from 'express'
import { getUserOrders,
        placeUserOrder,
        updateUserOrder,
        deleteUserOrder,
        adminGetAllOrders,
        adminUpdateOrderStatus
 } from '../controllers/orders'
import { checkAuth, checkRole } from '../middleware/checks'


const router = Router()

router.get('/', checkAuth, getUserOrders)
router.post('/', checkAuth, placeUserOrder)

//REVISE TO UPDATE ORDER QUANTITY
router.patch('/', checkAuth, updateUserOrder)

router.delete('/', checkAuth, deleteUserOrder)
router.get('/', checkAuth, checkRole(['admin']), adminGetAllOrders)
router.patch('/', checkAuth, checkRole(['admin']), adminUpdateOrderStatus)

export { router as ordersRouter }