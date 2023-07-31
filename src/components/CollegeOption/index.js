import './index.css'

const CollegeOption=props=>{
    const {updateCollege,collegeDetails}=props 
    const {id,display_text}=collegeDetails 

    const onClickClg=()=>{
        updateCollege(id,display_text)
    }

    return(
        <div className="clg-option-cont">
            <h1 onClick={onClickClg} className="clg-option-text">{display_text}</h1>
        </div>
    )
}

export default CollegeOption