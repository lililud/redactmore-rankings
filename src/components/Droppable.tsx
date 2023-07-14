import React, { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './droppable.module.css';
const Droppable: React.FC<{ children: ReactNode; id: string }> = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={styles.droppable}
      style={{ borderColor: isOver ? '#b0e212' : 'white' }}
    >
      {children}
    </div>
  );
};

export default Droppable;
