import './index.css'

const CollegeOption=props=>{
    const {collegeDetails,updateCollege}=props
    const {id,display_text}=collegeDetails
    const onClickCollege=()=>{
        updateCollege(id,display_text)
    }

    return(
        <div className="clg-option-container">
            <p onClick={onClickCollege} className="clg-name">{display_text}</p>
        </div>
    )
}

export default CollegeOption