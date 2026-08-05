'use client';

import { use, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './conversation.module.css';

import ChatMessage from '@/components/ChatMessage/ChatMessage';
import ChatInput from '@/components/ChatInput/ChatInput';
import Avatar from '@/components/Avatar/Avatar';
import { getChatById } from '@/lib/chat';
import {
  loadStoredMessages,
  saveStoredMessages,
} from '@/lib/messages';
import {
  formatMessageTime,
  groupMessagesByDate,
} from '@/lib/utils';

function TypingIndicator({ name }) {
  return (
    <div className={styles.typingWrap}>
      <div className={styles.typingBubble}>
        <span className={styles.typingDots} aria-hidden="true">
          <span /><span /><span />
        </span>
      </div>
      <span className={styles.typingLabel}>{name} is typing…</span>
    </div>
  );
}

function ConversationView({ conversationId, chat }) {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState(() =>
    loadStoredMessages(conversationId, chat.messages)
  );
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showTyping]);

  useEffect(() => {
    if (messages.length === 0) return;
    saveStoredMessages(conversationId, messages);
  }, [messages, conversationId]);

  const messageGroups = groupMessagesByDate(messages);

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'me',
      createdAt: new Date().toISOString(),
      status: 'sent',
    };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === newMessage.id ? { ...m, status: 'delivered' } : m
        )
      );
    }, 400);

    setShowTyping(true);
    setTimeout(() => setShowTyping(false), 2200);
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <Avatar name={chat.name} online={chat.online} />
          <div>
            <h3>{chat.name}</h3>
            <span className={chat.online ? styles.online : styles.offline}>
              <span className={styles.statusDot} aria-hidden="true" />
              {chat.online ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Voice call"
            disabled
            title="Coming soon"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Video call"
            disabled
            title="Coming soon"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Search in chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="More options"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
              <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
              <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </header>

      <div className={styles.messages}>
        <AnimatePresence initial={false}>
          {messageGroups.map((group) => (
            <div key={group.label} className={styles.dateGroup}>
              <span className={styles.dateLabel}>{group.label}</span>
              {group.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChatMessage
                    message={msg.text}
                    time={formatMessageTime(msg.createdAt)}
                    isOwnMessage={msg.sender === 'me'}
                    status={msg.status}
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {showTyping && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
            >
              <TypingIndicator name={chat.name} />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default function ConversationPage({ params }) {
  const { conversationId } = use(params);
  const chat = getChatById(conversationId);

  if (!chat) {
    return (
      <div className={styles.notFound}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p>Conversation not found</p>
        <Link href="/chat">Back to inbox</Link>
      </div>
    );
  }

  return (
    <ConversationView
      key={conversationId}
      conversationId={conversationId}
      chat={chat}
    />
  );
}
