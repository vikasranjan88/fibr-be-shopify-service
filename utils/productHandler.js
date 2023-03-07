import { Session } from "@shopify/shopify-api";
import Cryptr from "cryptr";
import ProductModel from "./models/ProductModel.js";

const cryption = new Cryptr(process.env.ENCRYPTION_STRING);

const storeSession = async (session) => {
  await ProductModel.findOneAndUpdate(
    { id: session.id },
    {
      content: cryption.encrypt(JSON.stringify(session)),
      shop: session.shop,
    },
    { upsert: true }
  );

  return true;
};

const loadSession = async (id) => {
  const sessionResult = await ProductModel.findOne({ id });
  if (sessionResult === null) {
    return undefined;
  }
  if (sessionResult.content.length > 0) {
    const sessionObj = JSON.parse(cryption.decrypt(sessionResult.content));
    const returnSession = new Session(sessionObj);
    return returnSession;
  }
  return undefined;
};

const deleteSession = async (id) => {
  await ProductModel.deleteMany({ id });
  return true;
};

const productHandler = { storeSession, loadSession, deleteSession };

export default productHandler;
