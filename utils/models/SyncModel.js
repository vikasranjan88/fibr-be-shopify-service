import mongoose from "mongoose";

const SyncSchema = new mongoose.Schema({
    shop: { type: String },
    synctime: { type: String }
});

const StoreModel = mongoose.model("sync_data", SyncSchema);

export default StoreModel;