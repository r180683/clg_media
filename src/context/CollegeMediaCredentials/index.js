import React from 'react'

const CollegeMediaCredentials=React.createContext({
    studentsCredentials:[{username:"dinesh",password:"dinesh"}],
    facultyCredentials:[{username:"stanley",password:"stanley"}],
    adminCredentials:[{username:"pradeep",password:"pradeep"}],
    addStudent:()=>{},
    addFaculty:()=>{},
    removeStudent:()=>{},
    removeFaculty:()=>{}
})

export default CollegeMediaCredentials