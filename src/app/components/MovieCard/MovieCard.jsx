import styles from './MovieCard.module.css';

function MovieCard({ title, rating, imageUrl }) {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={imageUrl} alt={title} className={styles.image} />
                <div className={styles.rating}>rating:{rating}★</div>
            </div>
            <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <button className={styles.detailsBtn}>Detalji</button>
            </div>
        </div>
    );
}

export default MovieCard;