import ProductModel from "../../utils/models/ProductModel.js";
import ProductmetaModel from "../../utils/models/ProductmetaModel.js";
import sessionHandler from "../../utils/sessionHandler.js";

import axios from 'axios';
const appproductadd = async (topic, shop, webhookRequestBody) => {
  
  if(topic == "PRODUCTS_CREATE")
  {
  const val=JSON.parse(webhookRequestBody)

  
  
  ProductModel.create({
    id: val.id,
    title: val.title,
    shop:shop,
            body_html:val.body_html,
            vendor:val.vendor,
            product_type:val.product_type,
            created_at:val.created_at,
            handle:val.handle,
            updated_at:val.updated_at,
            published_at:val.published_at,
            template_suffix:val.template_suffix,
            status:val.status,
            published_scope:val.published_scope,
            tags:val.tags,
            admin_graphql_api_id:val.admin_graphql_api_id,
            variants:val.variants,
            options:val.options,
            images:val.images,
            image:val.image
    
  });

  
 const session = await sessionHandler.loadSession('offline_'+shop);
var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'https://'+shop+'/admin/api/2021-10/products/'+val.id+'/metafields.json',
  headers: { 
    'Content-Type': 'application/json', 
    'cache-control': 'no-cache', 
    'X-Shopify-Access-Token': session.accessToken, 
    'Cookie': '_secure_admin_session_id=44e57b2090ba7e0ad633e70dc0e9d62e; _secure_admin_session_id_csrf=44e57b2090ba7e0ad633e70dc0e9d62e'
  }
};

axios(config)
.then(function (response) {

  ProductmetaModel.create({
    productID: val.id,
    shop: shop,
    metafields:JSON.stringify(response.data.metafields)  
    
  });

})
.catch(function (error) {
  console.log(error);
});
}
};

export default appproductadd;
