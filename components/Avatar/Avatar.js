import styles from './Avatar.module.css';

export default function Avatar({ name, online = false, size = 'md' }) {
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.avatar} ${styles[size]} ${online ? styles.online : ''}`}
        aria-hidden="true"
      >
        {name?.charAt(0).toUpperCase()}
      </div>
      {online && (
        <span className={styles.onlineBadge} aria-label="Online" />
      )}
    </div>
  );
}
