import SessionModel from "../../utils/models/SessionModel.js";
import StoreModel from "../../utils/models/StoreModel.js";
import CollectionsModel from "../../utils/models/CollectionsModel.js";
const appcollectionadd = async (topic, shop, webhookRequestBody) => {
  if(topic == "COLLECTIONS_CREATE")
  {
  const val=JSON.parse(webhookRequestBody)
  
  CollectionsModel.create({
    id: val.id,
    handle: val.handle,
    title:val.title,
    shop:shop,
    updated_at:val.updated_at,
    body_html:val.body_html,
    published_at:val.published_at,
    sort_order:val.sort_order,
    template_suffix:val.template_suffix,
    disjunctive:val.disjunctive,
    rules:val.rules,
    published_scope:val.published_scope,
    admin_graphql_api_id:val.admin_graphql_api_id
  });
}
};

export default appcollectionadd;
