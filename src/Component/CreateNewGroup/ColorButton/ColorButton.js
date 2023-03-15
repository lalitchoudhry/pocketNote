import React from 'react';
import styles from './ColorButton.module.css';

export default function ColorButton(props) {
  return (
    <button 
      className={`${styles.color_btn} ${props.groupColor === props.backColor && styles.selected_color_btn}`}
      style={{backgroundColor: `${props.backColor}`}}
      onClick={()=>props.setGroupColor(props.backColor)}
    ></button>
  )
}
