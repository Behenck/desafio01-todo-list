import ImageLogo from '../../assets/Logo.svg';

import styles from './styles.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={ImageLogo} alt="Logo todo" />
    </header>
  )
}