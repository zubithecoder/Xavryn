'use client';

import { motion } from 'framer-motion';

import styles from './AuthLayout.module.css';
import Logo from '@/components/Logo/Logo';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className={styles.container}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgGrid} aria-hidden="true" />

      <div className={styles.themeToggle}>
        <ThemeToggle />
      </div>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.logoWrapper}>
          <Logo size="large" href="/" />
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.content}>{children}</div>
      </motion.div>
    </div>
  );
}
