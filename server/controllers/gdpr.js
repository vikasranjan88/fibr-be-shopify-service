/**
 *
 * CUSTOMER_DATA_REQUEST
 *
 */

const customerDataRequest = async (topic, shop, webhookRequestBody) => {
  // Payload
  // {
  //   "shop_id": 123456,
  //   "shop_domain": "store.myshopify.com",
  //   "orders_requested": [
  //     123456,
  //     123456,
  //     123456,
  //   ],
  //   "customer": {
  //     "id": 123456,
  //     "email": "email@email.com",
  //     "phone": "123-123-1231"
  //   },
  //   "data_request": {
  //     "id": 1111
  //   }
  // }
  try {
	  console.log(111111)
   
    console.log(`Handle ${topic} for ${shop}`);
    console.log(webhookRequestBody);
    return { success: true };
  } catch (e) {
	  console.log(2222222222222)
    console.error(e);
    return { success: false };
  }
};

/**
 *
 * CUSTOMER_REDACT
 *
 */

const customerRedact = async (topic, shop, webhookRequestBody) => {
  // Payload
  // {
  //   "shop_id": 123456,
  //   "shop_domain": "store.myshopify.com",
  //   "customer": {
  //     "id": 123456,
  //     "email": "email@email.com",
  //     "phone": "123-123-1234"
  //   },
  //   "orders_to_redact": [
  //     123456,
  //     123456,
  //     123456
  //   ]
  // }
  try {
	  console.log(33333333333)
    console.log(`Handle ${topic} for ${shop}`);
    console.log(webhookRequestBody);
    return { success: true };
  } catch (e) {
	  console.log(44444444444)
    console.error(e);
    return { success: false };
  }
};

/**
 *
 * SHOP_REDACT
 *
 */

const shopRedact = async (topic, shop, webhookRequestBody) => {
  // Payload
  // {
  //   "shop_id": 123456,
  //   "shop_domain": "store.myshopify.com"
  // }
  try {
	  console.log(555555555555)
    console.log(`Handle ${topic} for ${shop}`);
    console.log(webhookRequestBody);
    return { success: true };
  } catch (e) {
	  console.log(6666666666)
    console.error(e);
    return { success: false };
  }
};

export { customerDataRequest, customerRedact, shopRedact };
