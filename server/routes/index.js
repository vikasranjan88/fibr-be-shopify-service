import { Router } from "express";
import clientProvider from "../../utils/clientProvider.js";
import subscriptionRoute from "./recurringSubscriptions.js";
import axios from 'axios';
import sessionHandler from "../../utils/sessionHandler.js";
import ProductModel from "../../utils/models/ProductModel.js";
import CollectionsModel from "../../utils/models/CollectionsModel.js";
import StoredataModel from "../../utils/models/StoredataModel.js";
import ProductmetaModel from "../../utils/models/ProductmetaModel.js";
import SyncModel from "../../utils/models/SyncModel.js";
import DiscountModel from "../../utils/models/discountModel.js";
import BillingModel from "../../utils/models/BillingModel.js";
import moment from "moment";
//const SessionModel = require("./models/SessionModel.js");
const userRoutes = Router();
userRoutes.use(subscriptionRoute);

userRoutes.get("/api", (req, res) => {



    const sendData = { text: "This is coming from /apps/api route11111." };
    res.status(200).json(sendData);
});

userRoutes.post("/api", (req, res) => {
    res.status(200).json(req.body);
});

userRoutes.get("/api/gql", async(req, res) => {
    //false for offline session, true for online session
    const { client } = await clientProvider.graphqlClient({
        req,
        res,
        isOnline: false,
    });


    const shop = await client.query({
        data: `{
shop {
  name,
  myshopifyDomain
}
}`,
    });

    //console.log(shop,'productproductproductproduct')

    res.status(200).send('loading...');
});

userRoutes.get("/api/billing", async(req, res) => {
    //false for offline session, true for online session
    const { client } = await clientProvider.graphqlClient({
        req,
        res,
        isOnline: false,
    });


    //     const shop = await client.query({
    //         data: `{
    // shop {
    //   name,
    //   myshopifyDomain,
    //   billingAddress { MailingAddress }
    // }
    // }`,
    //     });

    const shop = await client.query({
        data: `{
           shop { 
            name,
            myshopifyDomain,
            billingAddress { 
                    address1,
                    address2,
                    city,
                    company,
                    coordinatesValidated,
                    country,
                    countryCodeV2,
                    firstName,
                    formatted,
                    formattedArea,
                    id,
                    lastName,
                    latitude,
                    longitude,
                    name,
                    phone,
                    province,
                    provinceCode,
                    zip
            }
        }
}`,
    });

    console.log(shop.body.data.shop, 'billing info')
    const shopname = shop.body.data.shop.myshopifyDomain.split(".")[0];
    const shopd = shopname + '.myshopify.com';
    var array = shop.body.data.shop.billingAddress;
    array.shop = shopd;
    const billData = await BillingModel.findOne({ shop: shopd });
    if (billData) {
        Object.assign(billData, array);
    } else {
        await BillingModel.create(array);
    }
    console.log("Billing Info synced.")
    res.status(200).send('sussess');
});


userRoutes.get("/api/product", async(req, res) => {
    //false for offline session, true for online session

    const { client } = await clientProvider.graphqlClient({
        req,
        res,
        isOnline: false,
    });

    const shop = await client.query({
        data: `{
  shop {
    name,
    myshopifyDomain
  }
}`,
    });

    const shopname = shop.body.data.shop.myshopifyDomain.split(".")[0];

    // shopname = shopname.split(".")[0];
    // //const shopname=shopname.toLowerCase()
    // const shopname = shopname.replaceAll(' ', '-')

    const session = await sessionHandler.loadSession('offline_' + shopname + '.myshopify.com');

    //console.log(sessionResult,'shopnameshopnameshopname',shopname)
    // console.log('reqreqreqreqreqreqreqreq',req.headers.authorization)

    var data = '';
    var confignumber = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://' + shopname + '.myshopify.com/admin/api/2022-07/products/count.json',
        headers: {
            'X-Shopify-Access-Token': session.accessToken
        },
        data: data
    };
    var datastorecount = await axios(confignumber);
    var count = datastorecount.data.count;
    if (count > 250) {
        var countdata = count / 250;
        var totalloop = Math.ceil(countdata)
    } else {
        var totalloop = 1
    }
    var since_id = ''
    for (let i = 0; i < totalloop; i++) {


        if (since_id == '') {
            var url = 'https://' + shopname + '.myshopify.com/admin/api/2021-10/products.json?limit=250';
        } else {
            var url = 'https://' + shopname + '.myshopify.com/admin/api/2021-10/products.json?limit=250&since_id=' + since_id;
        }

        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'X-Shopify-Access-Token': session.accessToken
            },
            data: data
        };

        var datastore = await axios(config);
        const productsdata = datastore.data.products;
        var Storedata = await StoredataModel.findOne({ shop: shopname + '.myshopify.com' });
        for (const val of productsdata) {
            var arraydata = {
                id: val.id,
                shop: shopname + '.myshopify.com',
                shopID: Storedata.id,
                title: val.title,
                body_html: val.body_html,
                vendor: val.vendor,
                product_type: val.product_type,
                created_at: val.created_at,
                handle: val.handle,
                updated_at: val.updated_at,
                published_at: val.published_at,
                template_suffix: val.template_suffix,
                status: val.status,
                published_scope: val.published_scope,
                tags: val.tags,
                admin_graphql_api_id: val.admin_graphql_api_id,
                variants: val.variants,
                options: val.options,
                images: val.images,
                image: val.image

            };
            var collet = await ProductModel.findOne({ id: val.id });
            if (collet) {
                Object.assign(collet, arraydata);
                await collet.save();
                var metadata = await ProductmetaModel.findOne({ productID: val.id });
                if (metadata) {
                    var configdata = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: 'https://' + shopname + '.myshopify.com/admin/api/2021-10/products/' + val.id + '/metafields.json',
                        headers: {
                            'X-Shopify-Access-Token': session.accessToken,
                        }
                    };
                    var datastoremeta = await axios(configdata);
                    var productsmetadata = datastoremeta.data.metafields;
                    var metaarray = {
                        productID: val.id,
                        shop: shopname + '.myshopify.com',
                        shopID: Storedata.id,
                        metafields: productsmetadata
                    }
                    Object.assign(metadata, metaarray);
                }
            } else {
                await ProductModel.create(arraydata);
                var configdata = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://' + shopname + '.myshopify.com/admin/api/2021-10/products/' + val.id + '/metafields.json',
                    headers: {
                        'X-Shopify-Access-Token': session.accessToken,
                    }
                };
                var datastoremeta = await axios(configdata);
                var productsmetadata = datastoremeta.data.metafields;
                await ProductmetaModel.create({
                    productID: val.id,
                    shop: shopname + '.myshopify.com',
                    shopID: Storedata.id,
                    metafields: productsmetadata

                });
            }
            since_id = val.id;
        }
    }
    console.log("Product Sync Completed");
    const sendData = { text: "Completed." };
    res.status(200).json(sendData);
});

userRoutes.get("/api/collections", async(req, res) => {
    //false for offline session, true for online session
    const { client } = await clientProvider.graphqlClient({
        req,
        res,
        isOnline: false,
    });

    const shop = await client.query({
        data: `{
    shop {
      name,
      myshopifyDomain
    }
  }`,
    });

    const shopname = shop.body.data.shop.myshopifyDomain.split(".")[0];

    // shopname = shopname.split(".")[0];
    // //const shopname=shopname.toLowerCase()
    // const shopname = shopname.replaceAll(' ', '-')

    const session = await sessionHandler.loadSession('offline_' + shopname + '.myshopify.com');
    console.log('sessionsession', session)
    var data = '';
    var config_smart = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://' + shopname + '.myshopify.com/admin/api/2021-10/smart_collections.json',
        headers: {
            'X-Shopify-Access-Token': session.accessToken
        },
    };

    var config_custom = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://' + shopname + '.myshopify.com/admin/api/2021-10/custom_collections.json',
        headers: {
            'X-Shopify-Access-Token': session.accessToken
        },
    };

    var smart = await axios(config_smart);
    var productsdata = smart.data.smart_collections;
    console.log(productsdata);
    var Storedata = await StoredataModel.findOne({ shop: shopname + '.myshopify.com' });

    for (const val of productsdata) {
        var array = {
            id: val.id,
            title: val.title,
            body_html: val.body_html,
            handle: val.handle,
            updated_at: val.updated_at,
            published_at: val.published_at,
            sort_order: val.sort_order,
            template_suffix: val.template_suffix,
            disjunctive: val.disjunctive,
            rules: val.rules,
            published_scope: val.published_scope,
            admin_graphql_api_id: val.admin_graphql_api_id,
            image: val.image,
            shop: shopname + '.myshopify.com',
            shopID: Storedata.id,

        }
        var collet = await CollectionsModel.findOne({ id: val.id });
        if (collet) {
            Object.assign(collet, array);
            await collet.save();
        } else {
            await CollectionsModel.create(array);
        }
    }

    var custom = await axios(config_custom);
    var productsdata = custom.data.custom_collections;
    console.log(productsdata);
    for (const val of productsdata) {
        var array = {
            id: val.id,
            title: val.title,
            body_html: val.body_html,
            handle: val.handle,
            updated_at: val.updated_at,
            published_at: val.published_at,
            sort_order: val.sort_order,
            template_suffix: val.template_suffix,
            disjunctive: val.disjunctive,
            rules: val.rules,
            published_scope: val.published_scope,
            admin_graphql_api_id: val.admin_graphql_api_id,
            image: val.image,
            shop: shopname + '.myshopify.com',
            shopID: Storedata.id,
        }
        var collet = await CollectionsModel.findOne({ id: val.id });
        if (collet) {
            Object.assign(collet, array);
            await collet.save();
        } else {
            await CollectionsModel.create(array);
        }
    }
    res.status(200).send(productsdata);
});



userRoutes.get("/api/store", async(req, res) => {
    //false for offline session, true for online session
    const { client } = await clientProvider.graphqlClient({
        req,
        res,
        isOnline: false,
    });

    const shop = await client.query({
        data: `{
    shop {
      name,
      myshopifyDomain
    }
  }`,
    });

    const shopname = shop.body.data.shop.myshopifyDomain.split(".")[0];

    // shopname = shopname.split(".")[0];
    // //const shopname=shopname.toLowerCase()
    // const shopname = shopname.replaceAll(' ', '-')

    const session = await sessionHandler.loadSession('offline_' + shopname + '.myshopify.com');

    var data = '';
    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://' + shopname + '.myshopify.com/admin/api/2023-01/shop.json',
        headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
            'X-Shopify-Access-Token': session.accessToken
        }
    };

    var datastore = await axios(config);

    var val = datastore.data.shop
    var array = {
        id: val.id,
        name: val.name,
        email: val.email,
        domain: val.domain,
        accessToken: session.accessToken,
        shop: shopname + '.myshopify.com',
        province: val.province,
        country: val.country,
        address1: val.address1,
        zip: val.zip,
        city: val.city,
        source: val.source,
        phone: val.phone,
        latitude: val.latitude,
        longitude: val.longitude,
        primary_locale: val.primary_locale,
        address2: val.address2,
        created_at: val.created_at,
        updated_at: val.updated_at,
        country_code: val.country_code,
        country_name: val.country_name,
        currency: val.currency,
        customer_email: val.customer_email,
        timezone: val.timezone,
        iana_timezone: val.iana_timezone,
        shop_owner: val.shop_owner,
        money_format: val.money_format,
        province_code: val.province_code,
        weight_unit: val.weight_unit,
        taxes_included: val.taxes_included,
        tax_shipping: val.tax_shipping,
        money_with_currency_format: val.money_with_currency_format,
        plan_display_name: val.plan_display_name,
        county_taxes: val.county_taxes,
        has_gift_cards: val.has_gift_cards,
        myshopify_domain: val.myshopify_domain,
        requires_extra_payments_agreement: val.requires_extra_payments_agreement,
        eligible_for_payments: val.eligible_for_payments,
        has_storefront: val.has_storefront
    };
    var collet = await StoredataModel.findOne({ id: val.id });
    if (collet) {
        Object.assign(collet, array);
        await collet.save();
    } else {
        await StoredataModel.create(array);
    }
    const syncArray = {
        shop: shopname + '.myshopify.com',
        synctime: moment().format("YYYY-MM-DD HH:mm:ss")
    }
    await SyncModel.create(syncArray);
    syncArray.synctime = moment(syncArray.synctime).format("Do MMM YYYY, h:mm a");
    res.status(200).send({ sync_status: 1, synctime: syncArray.synctime });
});

userRoutes.get("/api/syncdata", async(req, res) => {
    //false for offline session, true for online session
    const { client } = await clientProvider.graphqlClient({
        req,
        res,
        isOnline: false,
    });

    const shop = await client.query({
        data: `{
    shop {
      name,
      myshopifyDomain
    }
  }`,
    });

    const shopname = shop.body.data.shop.myshopifyDomain.split(".")[0];

    // shopname = shopname.split(".")[0];
    // //const shopname=shopname.toLowerCase()
    // const shopname = shopname.replaceAll(' ', '-')

    var Storedata = await StoredataModel.findOne({ shop: shopname + '.myshopify.com' });

    if (Storedata) {
        var syncdata = await SyncModel.findOne({ shop: shopname + '.myshopify.com' });
        console.log(syncdata, 'syncdata');
        syncdata.synctime = moment(syncdata.synctime).format("Do MMM YYYY, h:mm a");
        res.status(200).send({ sync_status: 1, synctime: syncdata.synctime });
    } else {
        res.status(200).send({ sync_status: 0 });
    }
});

userRoutes.get("/api/discountcode", async(req, res) => {
    //false for offline session, true for online session
    const { client } = await clientProvider.graphqlClient({
        req,
        res,
        isOnline: false,
    });

    const shop = await client.query({
        data: `{
    shop {
      name,
      myshopifyDomain
    }
  }`,
    });

    const shopname = shop.body.data.shop.myshopifyDomain.split(".")[0];

    // shopname = shopname.split(".")[0];
    // //const shopname=shopname.toLowerCase()
    // const shopname = shopname.replaceAll(' ', '-')

    const session = await sessionHandler.loadSession('offline_' + shopname + '.myshopify.com');

    var data = '';
    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://' + shopname + '.myshopify.com/admin/api/2023-01/price_rules.json',
        headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
            'X-Shopify-Access-Token': session.accessToken
        }
    };

    var datarule = await axios(config);

    console.log(datarule.data);
    if (datarule.data.price_rules.length) {
        for (const rule of datarule.data.price_rules) {
            var configdisc = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://' + shopname + '.myshopify.com/admin/api/2023-01/price_rules/' + rule.id + '/discount_codes.json',
                headers: {
                    'Content-Type': 'application/json',
                    'cache-control': 'no-cache',
                    'X-Shopify-Access-Token': session.accessToken
                }
            };

            var datadisc = await axios(configdisc);
            console.log(datadisc.data);
            if (datadisc.data.discount_codes.length) {
                for (const code of datadisc.data.discount_codes) {
                    var array = {
                        "id": code.id,
                        "price_rule_id": code.price_rule_id,
                        "code": code.code,
                        "usage_count": code.usage_count,
                        "created_at": code.created_at,
                        "updated_at": code.updated_at
                    }
                    var discCode = await DiscountModel.findOne({ id: code.id });
                    if (discCode) {
                        Object.assign(discCode, array);
                        await discCode.save();
                    } else {
                        await DiscountModel.create(array);
                    }
                }
            }
        }
    }
    console.log("Discount Data Synced");
    res.status(200).send({ discount_status: 1 });

});


export default userRoutes;