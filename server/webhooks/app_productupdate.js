import SessionModel from "../../utils/models/SessionModel.js";
import StoreModel from "../../utils/models/StoreModel.js";
import ProductModel from "../../utils/models/ProductModel.js";
const appproductupdate = async (topic, shop, webhookRequestBody) => {
  if(topic == "PRODUCTS_UPDATE")
  {
 // await ProductModel.findOneAndUpdate({ shop }, { isActive: false });
 const val=JSON.parse(webhookRequestBody)
 console.log('valvalvalval=====================>',val)
   const filter = { id: val.id };

          const update = { $set: { id: val.id,
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
            image:val.image } };
           
            await  ProductModel.updateOne(filter, update, (err, result) => {
             
              console.log(err,'errerrerrerrerr')
              
            });
          }
};

export default appproductupdate;
