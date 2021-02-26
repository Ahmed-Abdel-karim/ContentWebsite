import { useState } from 'react';
import styles from './Collapse.module.css'

export default function project({title, answer, lang}) {
    const [open, setopen] = useState(false);
    return (
        <div className={`${styles.question} ${lang == 'en' ? styles.en : ''}`} onClick={() => setopen(!open)}>
            <div className={`${open ? styles.active : ''}`}>
                <h3>{title}</h3>
                <div className={styles.answer}>
                    <p>
                       {answer}
                    </p>
                </div>
            </div>
        </div>
    )
}