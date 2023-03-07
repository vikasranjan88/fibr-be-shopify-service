import mongoose from "mongoose";

const productmetaSchema = new mongoose.Schema({
    productID: {
        type: String,
        required: true
    },
    shop: {
        type: String,
        required: true,
    },
    shopID: { type: String, },
    metafields: {
        type: Array,

    }


});


const ProductmetaModel = mongoose.model("Product_metafileds", productmetaSchema);

export default ProductmetaModel;