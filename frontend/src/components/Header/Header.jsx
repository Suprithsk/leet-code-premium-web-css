import React from 'react'
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
        <h3>Premium Code</h3>
        <button className={styles.signin_btn}>Sign In</button>
    </header>
  )
}

export default Header