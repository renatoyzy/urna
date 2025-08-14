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

    useEffect(() => {

        if (input.includes('CONFIRMA')) {

            setInput('')
            setStep(current => current+1);

        } else if (input.includes('BRANCO')) {

            setInput('')
            window?.alert(parseInt(input));

        }

        switch (step) {
            case Steps.MATRICULA:
                setInnerElements((<>
                    <h1>Insira sua matrícula</h1>
                    {input}
                </>))
                break;

            case Steps.VEREADOR:
                setInnerElements((<>
                    <h1>Número do candidato a VEREADOR</h1>
                    {input}
                </>))
                break;

            case Steps.PREFEITO:
                setInnerElements((<>
                    <h1>Número do candidato a PREFEITO</h1>
                    {input}
                </>))
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

    }, [input, setInput, setInnerElements, step, setStep]);

    return (
        <div className={styles.screen}>
            <div className={styles.innerScreen}>
                {innerElements}
            </div>
        </div>
    )
}