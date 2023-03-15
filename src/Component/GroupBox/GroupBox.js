import React from 'react';
import Group from '../Group/Group';
import styles from './GroupBox.module.css';

export default function GroupBox(props) {

    return (
        <div className={styles.container}>
            <div className={styles.app_name}>
                <h2>Pocket Notes</h2>
                <button className={styles.group_cross_btn} onClick={props.toggleGroup}>x</button>
            </div>
            <button className={styles.group_add_btn} onClick={()=>props.setShowAddGroup(!props.showAddGroup)}>+ Create Notes</button>
            <div className={styles.group_box}>
                {props.groups && props.groups.map((group) => {

                    return <Group 
                        key={group.id} 
                        {...group} 
                        clickOnGroup={props.clickOnGroup}
                        activeGroup={props.activeGroup} 
                    />
                })}
            </div>
        </div>
    )
}
