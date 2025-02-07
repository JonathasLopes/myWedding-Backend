import { MongoClient } from "mongodb";

var client = null;

async function connectDB() {
    try {
        const userName = process.env.DBUSERNAME;
        const password = process.env.DBPASSWORD;
        const uri = `mongodb+srv://${userName}:${password}@sscluster.ydvm0.mongodb.net/?retryWrites=true&w=majority`;

        client = new MongoClient(uri);
        await client.connect();

        return client.db("Wedding");
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err);
        throw err;
    }
}

function closeConnection() {
    if (client != null) {
        client.close()
        client = null
    }
}

export {
    connectDB,
    closeConnection
}