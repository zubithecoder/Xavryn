'use client';

import { motion } from 'framer-motion';

import styles from './empty.module.css';

export default function ChatPage() {
  return (
    <motion.div
      className={styles.empty}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.iconWrap}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2>Your messages</h2>
      <p>Pick a conversation from the sidebar to start chatting, or search by name.</p>
      <div className={styles.hints}>
        <span className={styles.hint}>
          <kbd>↑</kbd> Scroll notes for status updates
        </span>
        <span className={styles.hint}>
          <kbd>#</kbd> Groups for team chats
        </span>
      </div>
    </motion.div>
  );
}
