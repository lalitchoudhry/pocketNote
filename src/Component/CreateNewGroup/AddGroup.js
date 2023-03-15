import React, {useState} from 'react';
import styles from './AddGroup.module.css';
import colorBtns from './ColorButton/ColorBtnArray';
import ColorButton from './ColorButton/ColorButton';

export default function AddGroup(props) {

  const [groupName, setGroupName] = useState('')
  const [groupColor, setGroupColor] = useState()

  return (
    props.show && <div className={styles.container}>
      <h3>Create New Notes</h3>
      <button className={styles.cross_btn} onClick={()=>props.setShowAddGroup(!props.show)}>x</button>
      <div className={styles.name_input}>
        <label className={styles.group_text} htmlFor="groupname">Group Name</label>
        <input 
          type="text" 
          name='groupname' 
          id='groupname' 
          placeholder='Enter your group name ....' 
          value={groupName}
          onChange={(e)=>setGroupName(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key === 'Enter'){
                e.preventDefault()
                props.addGroup(groupName, groupColor) 
                setGroupName('')
                setGroupColor('')
            }
        }}
        />
      </div>
      <div className={styles.group_color}>
        <div className={styles.group_text}>Choose colour</div>
        <div className={styles.color_box}>
          {colorBtns.map((btn)=>{

            return <ColorButton 
              key={btn.color}
              groupColor={groupColor}
              backColor={btn.color}
              setGroupColor={setGroupColor}
            />
          })}
        </div>
      </div>
      <div className={styles.create_btn}>
        <button 
          onClick={()=>{
            props.addGroup(groupName, groupColor) 
            setGroupName('')
            setGroupColor('')
            }}
        >Create</button>
      </div>
    </div>
  )
}
