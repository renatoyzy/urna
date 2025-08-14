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
  const { prefeito, vereador, eleitor } = req.body;

  try {
    await client.connect();
    const registeredVote = await client.db('urna').collection('votos').insertOne({ prefeito, vereador });
    await client.db('urna').collection('eleitores').findOneAndUpdate({matricula: eleitor}, {$set: {votou: true}});
    await res.status(200).json(registeredVote || undefined);
  } catch (error) {
    await res.status(404).json(error);
  } finally {
    await client.close();
  }
}