import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
    id: {
        type: String
    },
    price_rule_id: {
        type: String,
    },
    code: { type: String, },
    usage_count: { type: String, },
    created_at: { type: String, },
    updated_at: { type: String, },
});

const DiscountModel = mongoose.model("Discount_codes", discountSchema);

export default DiscountModel;