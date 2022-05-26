const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const paymentCtrl = {
    processPaymant: async (req, res) => {
        try {
            const myPayment = await stripe.paymentIntents.create({
                amount: req.body.amount,
                currency: "USD",
                metadata: {
                    company: "Ecommerce"
                }
            })
            res.status(200).json({ success: true, client_secret: myPayment.client_secret })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
    sendStripeApiKey: async (req, res) => {
        try {
            // const stripeApiKey = process.env.STRIPE_API_KEY
            res.json({ stripeApiKey: process.env.STRIPE_API_KEY })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = paymentCtrl
