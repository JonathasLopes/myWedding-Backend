import { Db } from "mongodb";
import Messages from "../Models/MessagesModel";
import { closeConnection, connectDB } from "../Connections/MongoDb";

const collectionName = "Messages";

async function SendMessage(message: Messages) {
    try {
        const db: Db = await connectDB();
        const collection = db.collection<Messages>(collectionName);

        await collection.insertOne(message);
    } catch (err) {
        throw err;
    } finally {
        closeConnection();
    }
}

async function GetAll() {
    try {
        const db: Db = await connectDB();
        const collection = db.collection<Messages>(collectionName);

        var result = await collection.find({}).toArray();

        return result;
    } catch (err) {
        throw err;
    } finally {
        closeConnection();
    }
}

async function DeleteById(id: string) {
    try {
        const db: Db = await connectDB();
        const collection = db.collection(collectionName);

        var result = await collection.deleteOne({ Id: id });

        return result;
    } catch (err) {
        throw err;
    } finally {
        closeConnection();
    }
}

export {
    SendMessage,
    GetAll,
    DeleteById
}