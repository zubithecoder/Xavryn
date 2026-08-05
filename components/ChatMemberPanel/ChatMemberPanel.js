'use client';

import Avatar from '@/components/Avatar/Avatar';

import styles from './ChatMemberPanel.module.css';

export default function ChatMemberPanel({ chat }) {
  if (!chat) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <p className={styles.emptyTitle}>Member info</p>
        <p className={styles.emptyText}>
          Select a conversation to view profile details and shared media.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.profile}>
        <Avatar name={chat.name} online={chat.online} size="lg" />
        <h3 className={styles.name}>{chat.name}</h3>
        <span className={chat.online ? styles.statusOnline : styles.statusOffline}>
          <span className={styles.statusDot} aria-hidden="true" />
          {chat.online ? 'Online' : 'Offline'}
        </span>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.actionBtn} disabled title="Coming soon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Call
        </button>
        <button type="button" className={styles.actionBtn} disabled title="Coming soon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          Video
        </button>
        <button type="button" className={styles.actionBtn} disabled title="Coming soon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Search
        </button>
      </div>

      <section className={styles.section}>
        <h4 className={styles.sectionTitle}>About</h4>
        <p className={styles.bio}>
          {chat.online
            ? 'Available for messages right now.'
            : 'Last seen recently. Messages will be delivered when they return.'}
        </p>
      </section>

      <section className={styles.section}>
        <h4 className={styles.sectionTitle}>Shared media</h4>
        <div className={styles.mediaGrid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={styles.mediaPlaceholder} aria-hidden="true" />
          ))}
        </div>
        <p className={styles.comingSoon}>Media gallery coming soon</p>
      </section>
    </div>
  );
}
