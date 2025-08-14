import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

/**
 * @param {Request} req
 * @param {Response} res
 */
export default async function handler(req, res) {
    try {
        await client.connect();
        res.status(200).json({ name: "John Doe" });
    } catch (error) {
        
    } finally {
        await client.close();
    }
}