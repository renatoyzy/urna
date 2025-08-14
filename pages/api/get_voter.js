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
    const { input } = req.body;

    try {
        await client.connect();

        const voter = await client.db('urna').collection('eleitores').findOne({ matricula: parseInt(input) });

        return voter ?
            await res.status(200).json({ matricula: voter.matricula, nome: voter.nome })
        : 
            await res.status(404).json({ found: false });

    } catch (error) {
        await res.status(404).json(error);
    } finally {
        await client.close();
    }
}