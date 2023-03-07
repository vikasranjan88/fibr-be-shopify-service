import mongoose from "mongoose";

const billingSchema = new mongoose.Schema({
    id: {
        type: String
    },
    address1: {
        type: String,
    },
    address2: { type: String, },
    shop: { type: String, },
    city: { type: String, },
    company: { type: String, },
    coordinatesValidated: { type: String, },
    country: { type: String, },
    countryCodeV2: { type: String, },
    firstName: { type: String, },
    formatted: { type: Array, },
    formattedArea: { type: String, },
    lastName: { type: String, },
    latitude: { type: String, },
    name: { type: String, },
    phone: { type: String, },
    province: { type: String, },
    provinceCode: { type: String, },
    zip: { type: String, }
});

const BillingModel = mongoose.model("billing_info", billingSchema);

export default BillingModel;