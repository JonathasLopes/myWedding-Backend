import { Db } from "mongodb";
import { connectDB, closeConnection } from "../Connections/MongoDb";
import Invites from "../Models/InvitesModel";
import IInvites from "../Interfaces/InvitesInterface";
import normalizeText from "../Helpers/NormalizeText";

const collectionName = "Invites";

async function CreateInvite(invite: Invites) {
    try {
        const db: Db = await connectDB();
        const collection = db.collection<Invites>(collectionName);

        await collection.insertOne(invite);
    } catch (err) {
        throw err;
    } finally {
        closeConnection();
    }
}

async function CreateInviteMassive(invites: Invites[]) {
    try {
        const db: Db = await connectDB();
        const collection = db.collection<Invites>(collectionName);

        await collection.insertMany(invites);
    } catch (err) {
        throw err;
    } finally {
        closeConnection();
    }
}

async function GetByName(name: string) {
    try {
        const db: Db = await connectDB();
        const collection = db.collection<IInvites>(collectionName);

        const users = await collection.find({ NameSearch: { $regex: new RegExp(".*" + normalizeText(name) + ".*", "i") } }).toArray();

        return users;
    } catch (err) {
        throw err;
    }
}

async function GetAllByFamilyId(familyId: number) {
    try {
        const db: Db = await connectDB();
        const collection = db.collection<IInvites>(collectionName);

        var result = await collection.find({ FamilyId: familyId }).toArray();

        return result;
    } catch (err) {
        throw err;
    }
}

async function GetAll() {
    try {
        const db: Db = await connectDB();
        const collection = db.collection<IInvites>(collectionName);

        var result = await collection.find({}).toArray();

        return result;
    } catch (err) {
        throw err;
    } finally {
        closeConnection();
    }
}

async function UpdateConfirmed(id: string, confirmed: boolean) {
    try {
        const db = await connectDB();
        const collection = db.collection(collectionName);

        const filter = { Id: id };
        const update = { $set: { Confirmed: confirmed } };
        const options = { returnDocument: "after", upsert: false };

        var result = await collection.findOneAndUpdate(filter, update, options);

        return result;
    } catch (err) {
        throw err;
    } finally {
        closeConnection();
    }
}

async function DeleteAll() {
    try {
        const db = await connectDB();
        const collection = db.collection(collectionName);

        var result = await collection.deleteMany({});

        return result;
    } catch (err) {
        throw err;
    } finally {
        closeConnection();
    }
}

export {
    CreateInvite,
    CreateInviteMassive,
    GetByName,
    GetAll,
    UpdateConfirmed,
    GetAllByFamilyId,
    DeleteAll,
}