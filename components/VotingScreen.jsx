import styles from "@/styles/components/VotingScreen.module.css";
import { useEffect, useState } from "react";

const Steps = Object.freeze({
    MATRICULA: 1,
    VEREADOR: 2,
    PREFEITO: 3,
    FINALIZADO: 4,
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

    useEffect(() => {

        switch (step) {
            case Steps.MATRICULA:
                setInnerElements((<>
                    <h1>Insira sua matrícula</h1>
                    {input}
                    <h2>{voter && 'Eleitor identificado'}</h2>
                    {voter?.nome}
                    <h2>{voter && 'Confirme novamente para prosseguir'}</h2>
                </>));

                if (input.includes('CONFIRMA')) {
                    
                    if(voter) {
                        setStep(current => current+1);
                        setInput('');
                    } else {
                        
                        (async() => {
                            const response = await fetch('/api/get_voter', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ input: input.replace('CONFIRMA', '') })
                            });

                            const data = await response?.json();

                            console.log("Eleitor identificado", data);
                            setVoter(data);
                        })();
                        
                        setInput(current => current.replace('CONFIRMA', ''))
                    };
                };

                break;

            case Steps.VEREADOR:
                setInnerElements((<>
                    <h1>Número do candidato a VEREADOR</h1>
                    {input}
                </>))

                if (input.includes('CONFIRMA')) {

                    setInput('')
                    setStep(current => current+1);

                } else if (input.includes('BRANCO')) {

                    setInput('')
                    window?.alert(parseInt(input));

                };

                break;

            case Steps.PREFEITO:
                setInnerElements((<>
                    <h1>Número do candidato a PREFEITO</h1>
                    {input}
                </>))

                if (input.includes('CONFIRMA')) {

                    setInput('')
                    setStep(current => current+1);

                } else if (input.includes('BRANCO')) {

                    setInput('')
                    window?.alert(parseInt(input));

                };

                break;

            case Steps.FINALIZADO:
                setInnerElements((<>
                    <h1>Voto registrado</h1>
                    <h3>Recarregando a página para o próximo eleitor...</h3>
                </>));
                setTimeout(() => {
                    window?.location?.reload();
                }, 5_000);
                break;

            default:
                break;
        }

    }, [input, setInput, setInnerElements, step, setStep, voter, setVoter]);

    return (
        <div className={styles.screen}>
            <div className={styles.innerScreen}>
                {innerElements}
            </div>
        </div>
    )
}