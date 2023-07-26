import './index.css'

const LoginOption=props=>{
    const {updateLoginOption,activeTabId,optionDetails}=props
    const {id,display_text}=optionDetails

    const updateOption=()=>{
        updateLoginOption(id)
    }

    const clsName=id===activeTabId?"active-option":null

    return(
        <li onClick={updateOption} className={`loption ${clsName}`}>
            {display_text}
        </li>
    )
}

export default LoginOption