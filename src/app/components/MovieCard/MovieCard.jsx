import styles from './MovieCard.module.css';
import Link from "next/link";

function MovieCard({ id,title, rating, imageUrl }) {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={imageUrl} alt={title} className={styles.image} />
                <div className={styles.rating}>rating:{rating}★</div>
            </div>
            <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <Link href={`/movie/${id}`}><button className={styles.detailsBtn}>Detalji</button></Link>

            </div>
        </div>
    );
}

export default MovieCard;