const Orders = require("../models/orderModel")
const Product = require("../models/productModel")

const orderCtrl = {
    createOrder: async (req, res) => {
        try {
            const { shippingInfor, orderItems, paymentInfor, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body

            const order = await Orders.create({
                shippingInfor, orderItems, paymentInfor, itemPrice, taxPrice, shippingPrice, totalPrice,
                paidAt: Date.now(),
                user: req.user._id
            })
            res.status(201).json({
                order
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // get single order
    getOrder: async (req, res) => {
        try {
            const order = await Orders.findById(req.params.id)
            // .populate(
            //     "user",
            //     "name email"
            // )
            if (!order) return res.status(400).json({ msg: "Order item is not found with this id" })

            res.status(200).json({ order })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // get all orders for user
    getAllOrders: async (req, res) => {
        try {
            const orders = await Orders.find({ user: req.user._id })
            if (orders.length === 0) return res.status(400).json({ msg: "You have no order" })
            res.status(200).json(orders)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // get all orders for admin
    getAdminAllorders: async (req, res) => {
        try {
            const orders = await Orders.find()

            let totalAmount = 0;

            orders.forEach((order) => {
                totalAmount += order.totalPrice
            });

            res.status(200).json({
                totalAmount,
                orders
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // Update order status -------Admin
    updateOrder: async (req, res) => {
        try {
            const order = await Orders.findById(req.params.id)

            if (!order) return res.status(404).json({ msg: "Order not found witg this id" })

            if (order.orderStatus === "Delivered") return res.status(400).json({ msg: "You have already delivered this order" })

            if (req.body.status === "Shipped") {
                order.orderItems.forEach(async (o) => {
                    await updateStock(o.product, o.quantity)
                })
            }
            order.orderStatus = req.body.status

            if (req.body.status === "Delivered") {
                order.deliverdAt = Date.now()
            }

            await order.save()
            res.status(200).json({
                success: true
            })

            async function updateStock(id, quantity) {
                const product = await Product.findById(id)

                product.Stock -= quantity;

                await product.save({ validateBeforeSave: false })
            }

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // Delete Order ---Admin
    deleteOrder: async (req, res) => {
        try {
            const order = await Orders.findById(req.params.id)
            if (!order) return res.status(404).json({ msg: "Order not found with this id" })

            await order.remove()

            res.status(200).json({ msg: "Order deleted" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = orderCtrl