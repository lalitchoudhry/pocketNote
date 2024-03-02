import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import AddGroup from '../../Component/CreateNewGroup/AddGroup';
import GroupBox from '../../Component/GroupBox/GroupBox';
import NoteArea from '../../Component/NoteArea/NoteArea';
import styles from './Home.module.css';

export default function Home() {

  const noteEndRef = useRef(null); // to show last note when it's group is open
  const [toggleGroupBox, setToggleGroupBox] = useState(true) // for toggle Group Box
  const [showAddGroupModel, setShowAddGroupModel] = useState(false) //for toggle add group model
  const [activeGroup, setActiveGroup] = useState() // for know who is active group now

  const [groups, setGroups] = useState('') // to store the array of group

  const [notes, setNotes] = useState([]) // to store the array of notes

  const [isValid, setIsValid] = useState() // for check the given input is valid or not

  const inValidInput = () => { // show error msg 
    setIsValid(true);
    setTimeout(() => {
      setIsValid(false)
    }, 1500);
  }

  const toggleGroup = ()=>{    //  ----- -------- toggle group box
    setToggleGroupBox(!toggleGroupBox)
  }

  const clickOnGroup = (groupName) => {  // -------- fetch the notes according to its active group

    setActiveGroup(groups.filter((group) => {
      return group.groupname === groupName
    }))

    setNotes(JSON.parse(localStorage.getItem(groupName)))
    scrollToBottom();
    if (window.innerWidth < 555) {
      setToggleGroupBox(!toggleGroupBox)
    }
  }

  const checkGrpIsExist = (name)=>{ //  --------- ------ --------check group name is exist or not
    let isExist = groups && groups.filter((group)=>group.groupname===name)
    console.log(isExist)
    return isExist.length>0 ? true : false;
  }

  const addGroup = (groupName, groupBackColor) => {  //  ------- add new group function

    if (checkGrpIsExist(groupName)) {
      alert("Group name is already exist")
      return
    }

    if (!groupName || !groupName.trim() || !groupBackColor){
      inValidInput();
    } else {
      const newGroup = {
        id: uuid(),
        groupname: groupName,
        backcolor: groupBackColor
      }

      setGroups([...groups, newGroup])
      setShowAddGroupModel(false)

      localStorage.setItem(groupName, JSON.stringify([]))
    }

  }

  const handleAddNote = (note) => { //  ---------------  to add new note in active group 

    const today = new Date();

    const newNote = {
      id: uuid(),
      date: `${today.getDate()} ${today.toLocaleDateString('en-US', { month: 'long' })} ${today.getFullYear()}`,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
      note: note
    }

    setNotes([...notes, newNote]);

  }

  const scrollToBottom = () => {      //   ------------ ---------- ------- scroll to last note
    noteEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {    // -------- ----------- -------  call when group is update to push new group in array

    if (groups !== '') {
      localStorage.setItem('notePocketGroups', JSON.stringify(groups))
      
    }
  }, [groups])

  useEffect(() => {      //  ------- ---------- -----  call when note is update to save new note in array

    activeGroup && localStorage.setItem(activeGroup[0].groupname, JSON.stringify(notes));

    scrollToBottom();
  }, [notes, activeGroup])



  useEffect(() => {     //  ------- --------- ------- for fetch the data of groups
    let notePocketGroups = JSON.parse(localStorage.getItem('notePocketGroups'));

    if (notePocketGroups !== null) {
      setGroups(notePocketGroups)
    }

  }, [])

  return (
    <div className={styles.container} >
      {isValid && <span className={styles.is_valid}>Invalid Input</span>}
      <div className={styles.comp_box} style={showAddGroupModel ? { pointerEvents: "none", opacity: "0.4" } : {}}>

        {toggleGroupBox && <GroupBox
          activeGroup={activeGroup}
          groups={groups}
          showAddGroup={showAddGroupModel}
          setShowAddGroup={setShowAddGroupModel}
          clickOnGroup={clickOnGroup}
          toggleGroup={toggleGroup}
        />}

        <NoteArea
          activeGroup={activeGroup}
          groups={groups}
          notes={notes}
          setNotes={setNotes}
          handleAddNote={handleAddNote}
          refNoteBody={noteEndRef}
          inValidInput={inValidInput}
          toggleGroupBox={toggleGroupBox}
          toggleGroup={toggleGroup}
        />

      </div>
      <AddGroup 
        show={showAddGroupModel}
        setShowAddGroup={setShowAddGroupModel}
        addGroup={addGroup}
      />
    </div>
  )
}
