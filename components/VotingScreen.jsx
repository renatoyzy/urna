import styles from "@/styles/components/VotingScreen.module.css";
import { useEffect, useState } from "react";

const Steps = Object.freeze({
    MATRICULA: 1,
    VEREADOR: 2,
    PREFEITO: 3,
    AGUARDE: 4,
    FINALIZADO: 5,
});

/**
 * @param {Object} properties
 * @param {string} properties.input 
 * @param {import("react").Dispatch<import("react").SetStateAction<string>>} properties.setInput
 */
export default function VotingScreen({
    input,
    setInput
}) {

    const [step, setStep] = useState(Steps.MATRICULA);
    const [innerElements, setInnerElements] = useState(<></>);

    const [voter, setVoter] = useState(undefined);
    const [candidateVereador, setCandidateVereador] = useState(undefined);
    const [candidatePrefeito, setCandidatePrefeito] = useState(undefined);

    useEffect(() => {

        switch (step) {
            case Steps.MATRICULA:
                setInnerElements((<>
                    <h1>Insira sua matrícula</h1>
                    {input}
                    {voter?.matricula && <hr></hr>}
                    <h2>{voter?.matricula && 'Eleitor identificado'}</h2>
                    {voter?.nome}
                    {voter?.matricula && <hr></hr>}
                    <h2>{voter?.matricula && (voter?.votou ? 'Este eleitor já votou' : 'Confirme para prosseguir')}</h2>
                </>));

                if(input.length==11 && !voter) {
                    (async() => {
                        const response = await fetch('/api/get_voter', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ input: input.replace('CONFIRMA', '') })
                        });

                        const data = await response?.json().catch(err => {});

                        console.log("Eleitor identificado", data);
                        setVoter(data);
                    })();
                };

                if (input.includes('CONFIRMA') && voter?.matricula && parseInt(voter.matricula) == parseInt(input) && !voter?.votou) {
                    setStep(current => current+1);
                    setInput('');
                } else if (input.includes('CONFIRMA')) {
                    setInput(current => current.replace('CONFIRMA', ''));
                } else if (input.includes('BRANCO')) {
                    setInput(current => current.replace('BRANCO', ''));
                } else if (input == '') {
                    setVoter(undefined);
                }

                break;

            case Steps.VEREADOR:
                setInnerElements((<>
                    <h1>Número do vereador</h1>
                    {input}
                    {candidateVereador?.numero && <hr></hr>}
                    <h2>{candidateVereador?.numero && 'Candidato identificado'}</h2>
                    {candidateVereador?.nome}
                    {candidateVereador?.foto && <img src={candidateVereador.foto} width={90} />}
                    {candidateVereador?.numero && <hr></hr>}
                    <h2>{candidateVereador?.numero && 'Confirme para votar'}</h2>
                </>));

                if(input.length==4 && !candidateVereador) {
                    (async() => {
                        const response = await fetch('/api/get_candidate', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ input: input.replace('CONFIRMA', ''), cargo: "vereador" })
                        });

                        const data = await response?.json().catch(err => {});

                        console.log("Candidato identificado", data);
                        setCandidateVereador(data);
                    })();
                };

                if (input.includes('CONFIRMA') && candidateVereador?.numero && parseInt(candidateVereador.numero) == parseInt(input) && !voter?.votou) {
                    setStep(current => current+1);
                    setInput('');
                } else if (input.includes('CONFIRMA')) {
                    setInput(current => current.replace('CONFIRMA', ''));
                } else if (input.includes('BRANCO')) {
                    setCandidateVereador({ nome: 'BRANCO', numero: 0 });
                    setStep(current => current+1);
                    setInput('');
                } else if (input == '') {
                    setCandidateVereador(undefined);
                }

                break;

            case Steps.PREFEITO:
                setInnerElements((<>
                    <h1>Número do prefeito</h1>
                    {input}
                    {candidatePrefeito?.numero && <hr></hr>}
                    <h2>{candidatePrefeito?.numero && 'Candidato identificado'}</h2>
                    {candidatePrefeito?.nome}
                    {candidatePrefeito?.foto && <img src={candidatePrefeito.foto} width={90} />}
                    {candidatePrefeito?.numero && <hr></hr>}
                    <h2>{candidatePrefeito?.numero && 'Confirme para votar'}</h2>
                </>));

                if(input.length==2 && !candidatePrefeito) {
                    (async() => {
                        const response = await fetch('/api/get_candidate', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ input: input.replace('CONFIRMA', ''), cargo: "prefeito" })
                        });

                        const data = await response?.json().catch(err => {});

                        console.log("Candidato identificado", data);
                        setCandidatePrefeito(data);
                    })();
                };

                if (input.includes('CONFIRMA') && candidatePrefeito?.numero && parseInt(candidatePrefeito.numero) == parseInt(input) && !voter?.votou) {
                    setStep(Steps.AGUARDE);

                    (async() => {
                        const response = await fetch('/api/post_vote', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ prefeito: candidatePrefeito, vereador: candidateVereador, eleitor: voter?.matricula })
                        });

                        const data = await response?.json().catch(err => {});

                        console.log("Voto registrado", data);
                        setStep(Steps.FINALIZADO);
                    })();

                    setInput('');
                } else if (input.includes('CONFIRMA')) {
                    setInput(current => current.replace('CONFIRMA', ''));
                } else if (input.includes('BRANCO')) {
                    setCandidatePrefeito({ nome: 'BRANCO', numero: 0 });
                    setStep(Steps.AGUARDE);

                    (async() => {
                        const response = await fetch('/api/post_vote', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ prefeito: { nome: 'BRANCO', numero: 0 }, vereador: candidateVereador, eleitor: voter?.matricula })
                        });

                        const data = await response?.json().catch(err => {});

                        console.log("Voto registrado", data);
                        setStep(Steps.FINALIZADO);
                    })();
                    
                    setInput('');
                } else if (input == '') {
                    setCandidatePrefeito(undefined);
                }

                break;

            case Steps.AGUARDE:
                setInnerElements((<>
                    <h1>Processando voto...</h1>
                    <h3>Aguarde alguns instantes.</h3>
                </>));
                break;

            case Steps.FINALIZADO:
                setInnerElements((<>
                    <h1>Voto registrado!</h1>
                    <h3>Recarregando a página para o próximo eleitor...</h3>
                </>));
                setTimeout(() => {
                    window?.location?.reload();
                }, 5_000);
                break;

            default:
                break;
        }

    }, [
        input, 
        setInput, 
        setInnerElements, 
        step, setStep, 
        voter, setVoter, 
        candidateVereador, setCandidateVereador, 
        candidatePrefeito, setCandidatePrefeito
    ]);

    return (
        <div className={styles.screen}>
            <div className={styles.innerScreen}>
                {innerElements}
            </div>
        </div>
    )
}