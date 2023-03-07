import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    shop: {
        type: String,
        required: true

    },
    shopID: { type: String, },
    title: {
        type: String
    },
    body_html: {
        type: String,
    },
    vendor: {
        type: String,

    },
    status: {
        type: String,

    },
    tag: {
        type: String,

    },
    product_type: { type: String, },
    created_at: { type: String, },
    handle: { type: String, },
    updated_at: { type: String, },
    published_at: { type: String, },
    template_suffix: { type: String, },
    published_scope: { type: String, },
    admin_graphql_api_id: { type: String, },
    variants: { type: Array, },
    options: { type: Array, },
    images: { type: Array, },
    image: { type: Object, },

});


const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;