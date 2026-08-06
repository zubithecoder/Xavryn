"use client";

import React from 'react'
import styles from "./page.module.css"
import { useParams } from 'next/navigation'
import Link from 'next/link';
import { motion } from "framer-motion";
import { Ellipsis } from "lucide-react";

const page = () => {
    const { profileID } = useParams()

    return (
        <div className={styles.profile}>
            <nav>
                <button><Link href="/chat">く</Link></button>
                <img src="./images/logo.png" alt="" />
                Profile
            </nav>
            <div className={styles.divider} />

            <main>
                <motion.div className={styles.profileInfo}
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                >
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile picture" />
                    <div>
                        <h1>{profileID}</h1>
                        <p>@{profileID}</p>

                        <div>
                            <button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle w-4 h-4 mr-2" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path></svg> Message</button>

                            <button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share2 lucide-share-2 w-4 h-4 mr-2" aria-hidden="true"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg> Share</button>

                            <div><button className={styles.menuButton}><Ellipsis size={20} /></button></div>
                        </div>
                    </div>
                </motion.div>

                <motion.div className={styles.bio}
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                >
                    <span><img src="./images/user.png" alt="" />About</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto dolorum, repellat autem vero reprehenderit ab. Quod, cupiditate maxime. Nihil culpa eos et similique quae omnis voluptatibus necessitatibus inventore ducimus itaque.</p>
                </motion.div>

                <motion.div className={styles.detailsContainer}
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                >
                    <div className={styles.detailCard}>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "0.5rem",
                            width: "2.5rem",
                            height: "2.5rem",
                            backgroundColor: "color-mix(in oklab, lab(56.2609% 29.7111 -85.0704) 10%, transparent)",
                            color: "rgb(90 122 255)",
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-5 h-5 text-primary" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>
                        </div>
                        <div>
                            <span>
                                EMAIL
                            </span>
                            <p>alex@example.com</p>
                        </div>
                    </div>

                    <div className={styles.detailCard}>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "0.5rem",
                            width: "2.5rem",
                            height: "2.5rem",
                            backgroundColor: "color-mix(in oklab, lab(70.5521% -66.5147 45.8073) 10%, transparent)",
                            color: "rgb(0 201 80)",
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-5 h-5 text-green-500" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                        </div>
                        <div>
                            <span>
                                JOINED
                            </span>
                            <p>January 2024</p>
                        </div>
                    </div>

                </motion.div>
            </main>
        </div>
    )
}

export default page