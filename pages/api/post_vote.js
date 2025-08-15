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
  const horario = new Date().toLocaleString('pt-br', {timeZone: 'America/Sao_Paulo'});
  const timestamp = Date.now();

  try {
    await client.connect();
    const registeredVote = await client.db('urna').collection('votos').insertOne({ horario, timestamp, prefeito, vereador });
    await client.db('urna').collection('eleitores').findOneAndUpdate({matricula: parseInt(eleitor)}, {$set: {votou: true}});
    return await res.status(200).json(registeredVote || undefined);
  } catch (error) {
    await res.status(404).json(error);
  } finally {
    await client.close();
  }
}