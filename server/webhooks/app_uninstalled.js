import SessionModel from "../../utils/models/SessionModel.js";
import StoreModel from "../../utils/models/StoreModel.js";
import ProductModel from "../../utils/models/ProductModel.js";
import CollectionsModel from "../../utils/models/CollectionsModel.js";
import StoredataModel from "../../utils/models/StoredataModel.js";
import ProductmetaModel from "../../utils/models/ProductmetaModel.js";
import SyncModel from "../../utils/models/SyncModel.js";
import BillingModel from "../../utils/models/BillingModel.js";
const appUninstallHandler = async(topic, shop, webhookRequestBody) => {
    await StoreModel.findOneAndUpdate({ shop }, { isActive: false });
    await SessionModel.deleteMany({ shop });
    await ProductModel.deleteMany({ shop });
    await ProductmetaModel.deleteMany({ shop });
    await CollectionsModel.deleteMany({ shop });
    await StoredataModel.deleteMany({ shop });
    await SyncModel.deleteMany({ shop });
    await BillingModel.deleteMany({ shop });
};

export default appUninstallHandler;