import CollectionsModel from "../../utils/models/CollectionsModel.js";
const appcollectiondelete = async (topic, shop, webhookRequestBody) => {
  console.log('COLLECTIONS_DELETECOLLECTIONS_DELETECOLLECTIONS_DELETECOLLECTIONS_DELETE')
  if(topic == "COLLECTIONS_DELETE")
  {
 const val=JSON.parse(webhookRequestBody)
 const filter = { id: val.id };
 await CollectionsModel.deleteOne(filter);

  }   


};

export default appcollectiondelete;
