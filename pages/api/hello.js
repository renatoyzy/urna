// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("urna").collection("eleitores").insertMany([
      {"matricula":16109213287,"nome":"ALINE PINHEIRO LINHARES"},
      {"matricula":17111341823,"nome":"GIULIA GABRYELLE RIBEIRO SILVA"},
      {"matricula":17111802019,"nome":"GIZELE ALVES DE SOUZA ANDRADE"},
      {"matricula":14103788687,"nome":"GUILHERME RIBEIRO DA COSTA"},
      {"matricula":16109305498,"nome":"GUSTAVO DA SILVA BENÍCIO"},
      {"matricula":14103660650,"nome":"HERICK VIEIRA DE SOUZA"},
      {"matricula":19115736819,"nome":"ISABELLE TEREZA FERNANDES LEMOS"},
      {"matricula":12001497668,"nome":"JOAO CARLOS MACHADO DOS SANTOS"},
      {"matricula":18113639529,"nome":"JOÃO GABRIEL DA SILVA MESQUITA"},
      {"matricula":22121608407,"nome":"JOÃO PEDRO DA MATTA ROCHA"},
      {"matricula":16109494390,"nome":"KAIO FERNANDO CORREIA CARDOZO"},
      {"matricula":15105497162,"nome":"KAUAN VÍCTOR RODRIGUES DE MELO"},
      {"matricula":14103655639,"nome":"LAISSA DOS SANTOS BRITO"},
      {"matricula":14103499861,"nome":"LETICIA OLIVEIRA CARDOSO"},
      {"matricula":20117760296,"nome":"LUDMILA VIEIRA DOS SANTOS LINS"},
      {"matricula":12001422523,"nome":"LUIZ HENRIQUE PEREIRA JACOMINI"},
      {"matricula":12001447579,"nome":"MARCOS PAULO GOMES DOS SANTOS"},
      {"matricula":15105025786,"nome":"MARIA CLARA MACHADO DE OLIVEIRA"},
      {"matricula":20118364080,"nome":"MARIA EDUARDA DOS SANTOS PINHEIRO"},
      {"matricula":11001871711,"nome":"MARIA EDUARDA FERREIRA DE FRANÇA"},
      {"matricula":14103882878,"nome":"NITCHELLY SOARES SILVA"},
      {"matricula":18113485469,"nome":"PEDRO HENRIQUE SILVA RODRIGUES"},
      {"matricula":13101752465,"nome":"RENATO AUGUSTO ALMEIDA DOS SANTOS"},
      {"matricula":18113590088,"nome":"YASMIN ELIAS AGUIAR"}
    ])
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
*/

export default function handler(req, res) {
  /*run().catch(console.dir);*/
  res.status(200).json({ name: "John Doe" });
}
