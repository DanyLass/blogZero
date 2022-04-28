import styles from './button.module.scss';

export function Button() {
  return (
    <button type="button" className={styles.clickButton}>
      Carregar mais posts
    </button>
  );
}
