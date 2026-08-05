import styles from './Button.module.css';

export default function Button({
  children,
  type = 'button',
  onClick,
  fullWidth = false,
  loading = false,
  disabled = false,
  variant = 'primary',
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={`${styles.button} ${fullWidth ? styles.fullWidth : ''} ${styles[variant]}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
    >
      {loading ? (
        <span className={styles.loader} aria-hidden="true" />
      ) : (
        children
      )}
    </button>
  );
}
