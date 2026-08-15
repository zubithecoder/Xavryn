'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { formatChatTime } from '@/lib/utils';

import styles from './ChatList.module.css';

export default function ChatList({ chats = [] }) {
  const params = useParams();
  const activeChatId = params?.conversationId;

  if (chats.length === 0) {
    return (
      <div className={styles.empty}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p>No conversations match your search.</p>
      </div>
    );
  }

  return (
    <div className={styles.chatList}>
      {chats.map((chat) => {
        const isActive = String(activeChatId) === String(chat.id);
        const hasUnread = chat.unread > 0;

        return (
          <Link
            key={chat.id}
            href={`/chat/${chat.id}`}
            className={`${styles.chatItem} ${isActive ? styles.active : ''}`}
          >
            <div className={styles.avatarWrap}>
              <div className={styles.avatar}>
                {chat.name.charAt(0)}
              </div>
              {chat.online && (
                <span className={styles.onlineDot} aria-label="Online" />
              )}
            </div>

            <div className={styles.chatInfo}>
              <div className={styles.topRow}>
                <h3
                  className={`${styles.chatName} ${hasUnread ? styles.bold : ''}`}
                >
                  {chat.name}
                </h3>
                <span className={styles.time}>
                  {formatChatTime(chat.lastMessageAt)}
                </span>
              </div>

              <div className={styles.bottomRow}>
                <p
                  className={`${styles.lastMessage} ${hasUnread ? styles.bold : ''}`}
                >
                  {chat.lastMessage}
                </p>
                {hasUnread && (
                  <span className={styles.badge}>{chat.unread}</span>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
