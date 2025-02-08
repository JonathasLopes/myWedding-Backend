import { Db } from "mongodb";
import { connectDB, closeConnection } from "../Connections/MongoDb";
import Invites from "../Models/InvitesModel";
import IInvites from "../Interfaces/InvitesInterface";

const collectionName = "Invites";

async function CreateInvite(invite: Invites) {
    try {
        const db:Db = await connectDB();
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
        const db:Db = await connectDB();
        const collection = db.collection<Invites>(collectionName);

        await collection.insertMany(invites);
    } catch (err) {
        throw err;
    } finally {
        closeConnection();
    }
}

async function GetByName(firstName: string, lastName?: string) {
    try {
        const db:Db = await connectDB();
        const collection = db.collection<IInvites>(collectionName);

        const query = lastName == undefined ? {
            $or: [
                { FirstName: { $regex: firstName, $options: "i" } },
            ]
        } : {
            $or: [
                { FirstName: { $regex: firstName, $options: "i" } }, // "i" para case-insensitive
                { LastName: { $regex: lastName, $options: "i" } }
            ]
        };

        var result = await collection.find(query).toArray();

        return result;
    } catch (err) {
        throw err;
    } finally {
        closeConnection();
    }
}

async function GetAllByFamilyId(familyId: number) {
    try {
        const db:Db = await connectDB();
        const collection = db.collection<IInvites>(collectionName);

        var result = await collection.find({ FamilyId: familyId }).toArray();

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

export {
    CreateInvite,
    CreateInviteMassive,
    GetByName,
    UpdateConfirmed,
    GetAllByFamilyId,
}