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
    const { input, cargo } = req.body;

    try {
        await client.connect();

        const candidate = await client.db('urna').collection(`candidatos_${cargo}`).findOne({ numero: parseInt(input) });

        return candidate ?
            await res.status(200).json({ numero: candidate.numero, nome: candidate.nome, foto: candidate.foto })
        : 
            await res.status(404).json(undefined);

    } catch (error) {
        await res.status(404).json(error);
    } finally {
        await client.close();
    }
}