'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import ChatGuard from '@/components/ChatGuard/ChatGuard';
import ChatList from '@/components/ChatList/ChatList';
import ChatMemberPanel from '@/components/ChatMemberPanel/ChatMemberPanel';
import ChatSearch from '@/components/ChatSearch/ChatSearch';
import Logo from '@/components/Logo/Logo';
import NotesRow from '@/components/NotesRow/NotesRow';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { groups, notes, getChatById } from '@/lib/chat';
import {
  getInboxSnapshot,
  getServerInboxSnapshot,
  parseInboxSnapshot,
} from '@/lib/inbox';
import { subscribeChats } from '@/lib/messages';
import {
  logout,
  parseUser,
  getUserSnapshot,
  subscribeSession,
} from '@/lib/session';
import { filterChats } from '@/lib/utils';

import styles from './chat.module.css';

export default function ChatLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const userSnapshot = useSyncExternalStore(
    subscribeSession,
    getUserSnapshot,
    () => null
  );
  const user = useMemo(
    () => parseUser(userSnapshot),
    [userSnapshot]
  );

  const inboxSnapshot = useSyncExternalStore(
    subscribeChats,
    getInboxSnapshot,
    getServerInboxSnapshot
  );
  const inboxChats = useMemo(
    () => parseInboxSnapshot(inboxSnapshot),
    [inboxSnapshot]
  );

  const filteredChats = useMemo(
    () => filterChats(inboxChats, search),
    [inboxChats, search]
  );

  const conversationId = pathname?.startsWith('/chat/')
    ? pathname.split('/chat/')[1]
    : null;
  const isConversation = Boolean(conversationId);
  const activeChat = conversationId ? getChatById(conversationId) : null;

  const handleSignOut = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <ChatGuard>
      <div
        className={`${styles.chatPage} ${isConversation ? styles.inConversation : ''}`}
      >
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <Logo size="medium" href="/chat" />
            <ThemeToggle />
          </div>

          <NotesRow notes={notes} />
          <ChatSearch value={search} onChange={setSearch} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Groups</h2>
            <div className={styles.groupList}>
              {groups.map((group) => (
                <div key={group.id} className={styles.groupItem}>
                  <div className={styles.groupAvatar}>#</div>
                  <div className={styles.groupInfo}>
                    <span className={styles.groupName}>{group.name}</span>
                    <span className={styles.groupPreview}>
                      {group.lastMessage}
                    </span>
                  </div>
                  {group.unread > 0 && (
                    <span className={styles.groupBadge}>{group.unread}</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className={`${styles.section} ${styles.messagesSection}`}>
            <h2 className={styles.sectionTitle}>Messages</h2>
            <ChatList chats={filteredChats} />
          </section>

          <div className={styles.sidebarFooter}>
            <div className={styles.userRow}>
              <div className={styles.userAvatarWrap}>
                <div className={styles.userAvatar}>
                  {(user?.name || 'U').charAt(0)}
                </div>
                <span className={styles.userOnlineDot} aria-label="You are online" />
              </div>
              <div className={styles.userMeta}>
                <span className={styles.userName}>
                  {user?.name || 'Guest'}
                </span>
                <span className={styles.userStatus}>Online</span>
              </div>
            </div>
            <div className={styles.footerActions}>
              <Link href="/settings" className={styles.footerLink}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Settings
              </Link>
              <button
                type="button"
                className={styles.signOut}
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </div>
        </aside>

        <main
          className={`${styles.chatArea} ${!isConversation ? styles.chatAreaEmpty : ''}`}
        >
          {isConversation && (
            <Link href="/chat" className={styles.backBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Inbox
            </Link>
          )}
          {children}
        </main>

        <aside className={styles.rightPanel}>
          <ChatMemberPanel chat={activeChat} />
        </aside>
      </div>
    </ChatGuard>
  );
}
