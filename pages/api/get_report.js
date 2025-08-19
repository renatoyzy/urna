import { MongoClient, ServerApiVersion } from "mongodb";
import jsPDF from 'jspdf';

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

        const candidatesCollection = client.db('urna').collection('candidatos'); 
        const votesCollection = client.db('urna').collection('votos');

        let candidates = await candidatesCollection.find().toArray();
        let report = '';

        for (const index in candidates) {
            var votesAmount = (await votesCollection.find({
                [candidates[index].cargo]: candidates[index].numero
            }).toArray()).length;
            var candidateName = candidates[index].nome;
            report = `${report}\n- Votos para ${candidateName}: ${votesAmount}`
        }

        const prefeitoNullVotesAmount = (await votesCollection.find({
            prefeito: 0
        }).toArray()).length;
        const vereadorNullVotesAmount = (await votesCollection.find({
            vereador: 0
        }).toArray()).length;

        report = `${report}\n\n- Votos nulos para prefeito: ${prefeitoNullVotesAmount}\n- Votos nulos para vereador: ${vereadorNullVotesAmount}`

        const doc = new jsPDF();

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text('Relatório da Urna Nova DFM', 20, 30);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        
        const splitText = doc.splitTextToSize(report || 'Conteúdo do documento...', 170);
        doc.text(splitText, 20, 50);
        
        const pdfBuffer = doc.output('arraybuffer');
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=documento.pdf');
        res.setHeader('Content-Length', pdfBuffer.byteLength);
        
        console.log(report);
        return await res.send(Buffer.from(pdfBuffer));
    } catch (error) {
        await res.status(404).json(error);
        console.error(error)
    } finally {
        await client.close();
    }
}