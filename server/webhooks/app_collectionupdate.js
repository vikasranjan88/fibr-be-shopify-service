import CollectionsModel from "../../utils/models/CollectionsModel.js";
const appcollectionupdate = async (topic, shop, webhookRequestBody) => {
  if(topic == "COLLECTIONS_UPDATE")
  {
 // await ProductModel.findOneAndUpdate({ shop }, { isActive: false });
 const val=JSON.parse(webhookRequestBody)
 console.log('valvalvalval=====================>',val)
   const filter = { id: val.id };

          const update = { $set: { id: val.id,
            handle: val.handle,
            title:val.title,
            updated_at:val.updated_at,
            body_html:val.body_html,
            shop:shop,
            published_at:val.published_at,
            sort_order:val.sort_order,
            template_suffix:val.template_suffix,
            disjunctive:val.disjunctive,
            rules:val.rules,
            published_scope:val.published_scope,
            admin_graphql_api_id:val.admin_graphql_api_id } };
           
            await  CollectionsModel.updateOne(filter, update, (err, result) => {
             
              console.log(err,'errerrerrerrerr')
              
            });
          }
};

export default appcollectionupdate;
