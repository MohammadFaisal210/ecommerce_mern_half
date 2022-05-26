const Product = require("../models/productModel")
const ErrorHandler = require("../utils/ErrorHandler")
const Features = require("../utils/Features")

const productCtrl = {
    getAllProducts: async (req, res) => {
        try {
            const resultperpage = 8
            const prductsCount = await Product.countDocuments()
            const feauters = new Features(Product.find(), req.query)
                .filtering()
                .sorting().paginating(resultperpage)
            const products = await feauters.query
            res.status(201).json({
                success: true,
                result: products.length,
                prductsCount: prductsCount,
                resultperpage: resultperpage,
                products: products,
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const product = await Product.create(req.body)
            res.status(201).json({
                product
            })
            // await product.save()
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            let product = await Product.findById(req.params.id)
            if (!product) { return res.status(500).json({ success: false, msg: "Product is not found with this id" }) }

            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: false
            })
            res.status(200).json({
                success: true,
                product
            })
        } catch (err) {
            return res.status(500).json({ success: false, msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            if (!product) res.status(500).json({ success: false, msg: "Product is not found with this id" })

            await product.remove(req.params.id)
            res.status(200).json({ success: true, msg: "Deleted a product" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            if (!product) return res.status(400).json({ msg: "Product not found with this id" })
            res.status(200).json({ product })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // Create new review or update the review
    createProductReview: async (req, res) => {
        try {
            const { rating, comment, productId } = req.body

            const review = {
                user: req.user.id,
                name: req.user.name,
                rating: Number(rating),
                comment
            }

            const product = await Product.findById(productId);

            const isReviewed = product.reviews.find(
                (rev) => rev.user.toString() === req.user._id.toString()
            )

            if (isReviewed) {
                product.reviews.forEach((rev) => {
                    if (rev.user.toString() === req.user._id.toString())
                        (rev.rating = rating), (rev.comment = comment)
                })
            } else {
                product.reviews.push(review);
                product.numofReviews = product.reviews.length;
            }

            let avg = 0;
            product.reviews.forEach((rev) => {
                avg += rev.rating
            })

            product.rating = avg / product.reviews.length

            // await product.save({ validateBeforeSave: false })
            await product.save()
            res.status(200).json({ success: true })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getReviews: async (req, res) => {
        try {
            const product = await Product.findById(req.query.id)  // this id is product id
            if (!product) return res.status(404).json({ msg: "Product is not found with this id" })
            res.status(200).json({
                success: true,
                reviews: product.reviews
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // Delete Review ---Admin
    deleteReview: async (req, res) => {
        try {
            const product = await Product.findById(req.query.productId); //this id is product id

            if (!product) return res.status(404).json({ msg: "Product is not found with this id" })

            const reviews = product.reviews.filter(
                (rev) => rev._id.toString() !== req.query.id.toString()  //this id is revies _id
            )

            let avg = 0;

            reviews.forEach((rev) => {
                avg += rev.rating;
            })

            let ratings = 0;

            if (reviews.length == 0) {
                ratings = 0
            } else {
                ratings = avg / reviews.length
            }

            const numofReviews = reviews.length

            await Product.findByIdAndUpdate(
                req.query.productId,
                {
                    reviews,
                    ratings,
                    numofReviews
                }
            )
            res.status(200).json({
                success: true
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}
module.exports = productCtrl