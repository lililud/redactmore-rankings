'use client';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import styles from './page.module.css';
import {
  DndContext,
  DragEndEvent,
  rectIntersection,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import Draggable from '@/components/Draggable';
import Droppable from '@/components/Droppable';
// Little helpers ...
const url2 = (name: string, wrap = false) =>
  'https://emoji.slack-edge.com/T0160NTJ2PM/butt-sfw/8d38112653cbe405.gif';
const url = (name: string, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ')' : ''
  }`;
const users = ['kylie', 'velosiegy', 'hannah b. fried', 'updoolian', 'mary', 'nima'];

const colors: Record<string, string> = {
  ['kylie']: '#636393',
  velosiegy: '#B5222d',
  ['hannah b. fried']: '#d4953c',
  updoolian: '#609491',
  mary: 'black',
  nima: 'green',
};
const draggables: Record<string, ReactNode> = users.reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: (
      <Draggable background={colors[curr]} id={curr}>
        {curr}
      </Draggable>
    ),
  }),
  {},
);

export default function App() {
  const [rankingMap, setRankingMap] = useState<Record<string, { id: string }>>({});
  const [userToRankingMap, setUserToRankingMap] = useState<Record<string, string>>(
    users.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over) {
      const currentRank = userToRankingMap[event.active.id.toString()];
      const currentUserAtRank = rankingMap[event.over.id.toString()]?.id;
      if (currentUserAtRank) {
        // users' rank is overwritten
        setUserToRankingMap(u => {
          return { ...u, [currentUserAtRank]: '' };
        });
      }

      setUserToRankingMap(u => {
        return { ...u, [event.active.id.toString()]: event.over!.id.toString() };
      });

      setRankingMap(s => {
        const newM = { ...s };
        if (currentRank) {
          delete newM[currentRank];
        }
        // delete s[event.over!.id.toString()];
        return {
          ...newM,
          [event.over!.id.toString()]: {
            id: event.active.id.toString(),
          },
        };
      });
    } else if (!event.over) {
      // remove ranking for active Id
      const rankingId = userToRankingMap[event.active.id.toString()];
      console.log('removing for ranking', rankingId);
      setUserToRankingMap(u => {
        const a = { ...u, [event.active.id]: '' };
        // console.log('userRankingMap', a);
        return a;
      });

      setRankingMap(s => {
        delete s[rankingId];
        console.log('rankingMap', s);
        return s;
      });
    } else {
      console.log('in the else', event);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={styles.container}>
        <div
          className={styles.background}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            gap: '1rem',
          }}
        >
          <div>
            <img src="https://emoji.slack-edge.com/T0160NTJ2PM/kyle-intense/14a0fed13c0dc02e.png" />
            <div>
              <h1>team rankings </h1>
              <h2>by kylie redactmore</h2>
            </div>
          </div>
          <div>
            <h2>users</h2>
            <div className={styles.users}>
              {Object.values(userToRankingMap).map(
                (d, i) =>
                  !userToRankingMap[users[i]] && (
                    <div key={users[i]}>{draggables[users[i]]}</div>
                  ),
              )}
            </div>
          </div>
          <h2>today's ranking</h2>
          <div className={styles.rankingContainer}>
            {users.map((r, i) => {
              const user = rankingMap[`droppable-${i}`];
              return (
                <div key={i}>
                  <Droppable id={`droppable-${i}`}>
                    <div className={styles.gridCell}>
                      {user ? (
                        draggables[user.id]
                      ) : (
                        <div className={styles.stack}>
                          <h2>🏆{i + 1}</h2>
                          drag here
                        </div>
                      )}
                    </div>
                    {user && <h2>🏆{i + 1}</h2>}
                  </Droppable>
                </div>
              );
            })}
          </div>
          <button
            className={styles.submit}
            type="submit"
            onClick={e => e.preventDefault()}
          >
            lock in
          </button>
        </div>
      </div>
    </DndContext>
  );
}
