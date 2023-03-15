import React from 'react';
import styles from './Note.module.css';

export default function Note(props) {
  return (
    <div className={styles.container}>
        <div className={styles.time_box}>
          <p>{props.date}</p>
          <p>{props.time}</p>
        </div>
        <div className={styles.note_box}>{props.note}</div>
    </div>
  )
}
