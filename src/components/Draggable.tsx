import React, { ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from './draggable.module.css';

const Draggable: React.FC<{ children: ReactNode; id: string; background: string }> = ({
  id,
  background,
  children,
}) => {
  const { setNodeRef: dragRef, transform, listeners, attributes } = useDraggable({ id });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className={styles.draggable}
      ref={dragRef}
      {...listeners}
      {...attributes}
      style={{ ...style, background, color: 'white' }}
    >
      {children}
    </div>
  );
};

export default Draggable;
