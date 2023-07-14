'use client';
import styles from './page.module.css';
import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Link from 'next/link';

const shuffle = require('lodash.shuffle');
const ogData = [
  { key: 0, name: 'mary', ranking: 2, color: 'pink' },
  { key: 1, name: 'kyle', ranking: 0, color: 'blue' },
  { key: 2, name: 'sieg', ranking: 1, color: 'red' },
].sort((a, b) => a.rating - b.rating);
export default function Home() {
  const [start, setStart] = useState(false);
  const [data, setData] = useState([...ogData]);
  const alignCenter = { display: 'flex', alignItems: 'center' };
  const [rankings, setRankings] = useState([0, 1, 2]);
  useEffect(() => {
    const t = setInterval(() => {
      Math.random();
      setRankings(() => {
        const r = shuffle(rankings);
        console.log('shuffling', r);
        setData([...data.sort((a, b) => r[a.ranking] - r[b.ranking])]);
        return r;
      });
    }, 2000);
    const timer = setTimeout(() => {
      setStart(true);
    }, 1500);
    const t2 = setTimeout(() => {
      setRankings(rankings.sort());
      setData(data.sort((a, b) => a.ranking - b.ranking));

      clearInterval(t);
    }, 10000);
    return () => {
      clearInterval(t);
      clearTimeout(t2);
      clearTimeout(timer);
    };
  }, []);
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
        enter rankings{' '}
      </Link>
    </div>
  );
}
