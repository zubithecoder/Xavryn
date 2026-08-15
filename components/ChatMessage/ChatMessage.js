'use client';

import styles from './ChatMessage.module.css';

function StatusTicks({ status }) {
  if (!status) return null;

  const isRead = status === 'read';
  const isDelivered = status === 'delivered';

  return (
    <span
      className={`${styles.ticks} ${isRead ? styles.ticksRead : ''}`}
      aria-label={isRead ? 'Read' : isDelivered ? 'Delivered' : 'Sent'}
    >
      {isDelivered || isRead ? '✓✓' : '✓'}
    </span>
  );
}

export default function ChatMessage({
  message,
  time,
  isOwnMessage = false,
  status,
}) {
  return (
    <div
      className={`${styles.messageWrapper} ${
        isOwnMessage ? styles.ownWrapper : styles.otherWrapper
      }`}
    >
      <div
        className={`${styles.messageBubble} ${
          isOwnMessage ? styles.ownBubble : styles.otherBubble
        }`}
      >
        <p className={styles.messageText}>{message}</p>
        <div className={styles.meta}>
          <span className={styles.messageTime}>{time}</span>
          {isOwnMessage && <StatusTicks status={status} />}
        </div>
      </div>
    </div>
  );
}
