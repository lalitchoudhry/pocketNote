import React, {useState} from 'react';
import Group from '../Group/Group';
import Note from '../Note/Note';
import styles from './NoteArea.module.css';

export default function NoteArea(props) {

    const [note, setNote] = useState();
    

    const addNote = ()=>{
        if (!props.activeGroup) {
            alert('Please Create or Select Group')
            return
        }
        if (!note || !note.trim()) {
            setNote('')
            props.inValidInput();
        } else {
            
            setNote('')
            props.handleAddNote(note)
        }
    }
    

  return (
    <div className={styles.container} style={{"@media (maxWidth: 524px)":{display: 'none'}}}>
        <div className={styles.active_group}>
            {!props.toggleGroupBox && <button className={styles.group_toggle_btn} onClick={props.toggleGroup}>
                <i className="bi bi-list"></i>
            </button>}
            {props.activeGroup ? <Group {...props.activeGroup[0]}/> : <Group />}
        </div>
        <div className={styles.note_text_box}>
            <div className={styles.note_box}>
                {props.notes && props.notes.map((note)=>{

                    return <Note key={note.id} {...note}/>
                })}
                <div ref={props.refNoteBody} />
            </div>
            <div className={styles.textarea}>
                <textarea
                    name="note"
                    placeholder='Enter your text here.....'
                    value={note}
                    onChange={(e)=>setNote(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key === 'Enter'){
                            e.preventDefault()
                            addNote()
                        }
                    }}
                    
                />
                <button onClick={addNote}><i className="bi bi-send-fill"></i></button>
            </div>
        </div>
    </div>
  )
}
