import mongoose from "mongoose";

const collectionsSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    body_html: {
        type: String,
    },

    handle: {
        type: String,
    },
    updated_at: { type: String, },
    published_at: { type: String, },
    sort_order: { type: String, },
    template_suffix: { type: String, },
    disjunctive: { type: String, },
    rules: { type: Array, },
    published_scope: { type: String, },
    admin_graphql_api_id: { type: String, },
    image: { type: Object, },
    shop: { type: String, },
    shopID: { type: String, },

});


const CollectionsModel = mongoose.model("Collection", collectionsSchema);

export default CollectionsModel;