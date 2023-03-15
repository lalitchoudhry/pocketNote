import React from 'react';
import styles from './Group.module.css';

export default function Group(props) {

  const clickOnGroup = ()=>{
    props.clickOnGroup(props.groupname)
  }
    
  return (
    <div 
      className={`${styles.container} ${props.activeGroup && (props.activeGroup[0].groupname === props.groupname && styles.active_grp)}`} 
      onClick={clickOnGroup}>
        <h3 style={{backgroundColor:`${props.backcolor}`}}>{props.groupname && (props.groupname).slice(0, 2).toUpperCase()}</h3>
        <p>{props.groupname}</p>
    </div>
  )
}
