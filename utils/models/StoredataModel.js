import mongoose from "mongoose";

const storedataSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
    },
    accessToken: { type: String, },
    shop: { type: String, },
    email: { type: String, },
    domain: { type: String, },
    province: { type: String, },
    country: { type: String, },
    address1: { type: String, },
    zip: { type: String, },
    city: { type: String, },
    source: { type: String, },
    phone: { type: String, },
    latitude: { type: String, },
    longitude: { type: String, },
    primary_locale: { type: String, },
    address2: { type: String, },
    created_at: { type: String, },
    updated_at: { type: String, },
    country_code: { type: String, },
    country_name: { type: String, },
    currency: { type: String, },
    customer_email: { type: String, },
    timezone: { type: String, },
    iana_timezone: { type: String, },
    shop_owner: { type: String, },
    money_format: { type: String, },
    province_code: { type: String, },
    weight_unit: { type: String, },
    taxes_included: { type: String, },
    tax_shipping: { type: String, },
    money_with_currency_format: { type: String, },
    plan_display_name: { type: String, },
    county_taxes: { type: String, },
    has_gift_cards: { type: String, },
    myshopify_domain: { type: String, },
    requires_extra_payments_agreement: { type: String, },
    eligible_for_payments: { type: String, },
    has_storefront: { type: String, },



});


const StoredataModel = mongoose.model("Store", storedataSchema);

export default StoredataModel;