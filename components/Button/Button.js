import Link from "next/link";
import styles from './Button.module.css';

function Button({ path, text, target }) {
    return (
        <Link href={path}>
            <a className={styles.button_cont} target={`${target ? '_blank' : ''}`}>
                { text }
            </a>
        </Link>
    )
}
export default Button;