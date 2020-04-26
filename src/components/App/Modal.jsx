import React, { useLayoutEffect } from 'react';
import { Portal } from './Portal';

import styles from './modal.module.css';

export default function Modal ({ children, onClose, title }) {
  useLayoutEffect(
    () => {
      const documentElement = document.documentElement;
      const body = document.body;

      if (!documentElement) return;
      if (!body) return;

      const scrollPosition = documentElement.scrollTop;

      body.style.top = `-${scrollPosition}px`;
      body.classList.add('lock-scroll');

      return () => {
        body.classList.remove('lock-scroll');
        body.style.top = '';

        documentElement.scrollTop = scrollPosition;
      };
    },
    []
  );

  return (
    <Portal>
      <div className={styles.container}>
        <section className={styles.modal}>
          <button className={styles.close} onClick={onClose}>
            <span>Close</span>
          </button>
          <h1>{title}</h1>
          <div className={styles.content}>
            {children}
          </div>
        </section>
      </div>
    </Portal>
  )
}
