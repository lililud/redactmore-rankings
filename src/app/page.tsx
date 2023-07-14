'use client';
import styles from './page.module.css';
import React from 'react';

import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.background}>
      <div className={styles.row}>
        <img src="https://emoji.slack-edge.com/T0160NTJ2PM/kyle-intense/14a0fed13c0dc02e.png" />
        <div>
          <h1>team rankings </h1>
          <h2>by kylie [redact]more</h2>
        </div>
      </div>
      <Link className={styles.submit} href="/rankings">
        enter rankings
      </Link>
    </div>
  );
}
