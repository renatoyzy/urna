import styles from "@/styles/components/VotingButtons.module.css";

/**
 * @param {Object} properties
 * @param {import("react").Dispatch<import("react").SetStateAction<string>>} properties.setInput
 */
export default function VotingButtons({
    setInput
}) {
    return (
        <div className={styles.buttons}>
            <button onClick={() => setInput(current => current + '1')}>
                1
            </button>
            <button onClick={() => setInput(current => current + '2')}>
                2
            </button>
            <button onClick={() => setInput(current => current + '3')}>
                3
            </button>
            <button onClick={() => setInput(current => current + '4')}>
                4
            </button>
            <button onClick={() => setInput(current => current + '5')}>
                5
            </button>
            <button onClick={() => setInput(current => current + '6')}>
                6
            </button>
            <button onClick={() => setInput(current => current + '7')}>
                7
            </button>
            <button onClick={() => setInput(current => current + '8')}>
                8
            </button>
            <button onClick={() => setInput(current => current + '9')}>
                9
            </button>
            <div />
            <button onClick={() => setInput(current => current + '0')}>
                0
            </button>
            <div />
            <button style={{ backgroundColor: "white", color: "black" }} onClick={() => setInput(current => current + 'BRANCO')}>
                BRANCO
            </button>
            <button style={{ backgroundColor: "red" }} onClick={() => setInput('')}>
                CORRIGE
            </button>
            <button style={{ backgroundColor: "green" }} onClick={() => setInput(current => current + 'CONFIRMA')}>
                CONFIRMA
            </button>
        </div>
    )
}