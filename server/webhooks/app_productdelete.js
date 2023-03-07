import SessionModel from "../../utils/models/SessionModel.js";
import StoreModel from "../../utils/models/StoreModel.js";
import ProductModel from "../../utils/models/ProductModel.js";
import ProductmetaModel from "../../utils/models/ProductModel.js";
const appproductdelete = async (topic, shop, webhookRequestBody) => {
 
 // await ProductModel.findOneAndUpdate({ shop }, { isActive: false });
 if(topic == "PRODUCTS_DELETE")
  {
 const val=JSON.parse(webhookRequestBody)
 console.log('valvalvalvalval',val)
 const filter = { id: val.id };
 const filterdata = { productID: val.id };
 await ProductModel.deleteOne(filter);
 await ProductmetaModel.deleteOne(filterdata);

  }      
  
};

export default appproductdelete;
