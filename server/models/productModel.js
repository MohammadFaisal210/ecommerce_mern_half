const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name of a product"],
        trim: true,
        maxlength: [15, "Product name not exceed than 20 characters"]
    },
    description: {
        type: String,
        required: [true, "Please add a description of your product"],
        maxlength: [400, "Description is can not exceed than 400 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please add a price for your product"],
        maxlength: [8, "Price is can not exceed than 8 characters"]
    },
    discountPrice: {
        type: String,
        maxlength: [4, "Discount is can not exceed than 4 characters"]
    },
    color: {
        type: String
    },
    size: {
        type: String
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please add a category of your product"]
    },
    Stock: {
        type: Number,
        required: [true, "Please add some stock for your product"],
        maxlength: [3, "Stock can not exceed than 3 characters"]
    },
    numofReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String
            },
            time: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        // required: true
    },
    // createAt: {
    // type: Date,
    // default: Date.now()
    // }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)