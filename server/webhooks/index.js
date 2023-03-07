//Combine all your webhooks here
import { DeliveryMethod } from "@shopify/shopify-api";
import shopify from "../../utils/shopifyConfig.js";
import appUninstallHandler from "./app_uninstalled.js";
import appproductupdate from "./app_productupdate.js";
import appproductuadd from "./app_productadd.js";
import appproductdelete from "./app_productdelete.js";
import appcollectionadd from "./app_collectionadd.js";
import appcollectionupdate from "./app_collectionupdate.js";
import appcollectiondelete from "./app_collectiondelete.js";

/*
  Template for adding new topics:
  ```
  TOPIC: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/topic",
      callback: topicHandler,
    },
  ```

    - Webhook topic and callbackUrl topic should be exactly the same because it's using catch-all
    - Don't change the delivery method unless you know what you're doing
      - the method is `DeliveryMethod.Http` and not `DeliveryMethod.http`, mind the caps on `H` in `http`
*/

const webhookRegistrar = async () => {
  await shopify.webhooks.addHandlers({
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/app_uninstalled",
      callback: appUninstallHandler,
    },
    PRODUCTS_CREATE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/app_productadd",
      callback: appproductuadd,
    },
    PRODUCTS_UPDATE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/app_productupdate",
      callback: appproductupdate,
    },
    PRODUCTS_DELETE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/app_productdelete",
      callback: appproductdelete,
    },
    COLLECTIONS_UPDATE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/app_collectionupdate",
      callback: appcollectionupdate,
    },
    COLLECTIONS_CREATE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/app_collectionadd",
      callback: appcollectionadd,
    },
    
    COLLECTIONS_DELETE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/app_collectiondelete",
      callback: appcollectiondelete,
    },
    
    
  });
};

export default webhookRegistrar;
