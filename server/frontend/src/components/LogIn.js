import React,{useState} from 'react';
import './LogIn.css'

const defaulInputs = {name:"",email:"",password:""}
function LogIn({toggle}) {
    const [varToggle, setVarToggle] = useState(false);
    const [varinputs, setVarinputs] = useState(defaulInputs);
    const handleToggleForm = (e) =>{
        e.preventDefault()
        resetInputs()
        varToggle === false ? setVarToggle(true): setVarToggle(false)
        let textContents = [
            `Sign ${varToggle === true ? "Up":"In"} To Your Account`,
            `Sign ${varToggle === true ? "Up":"In"} `,
            `Sign ${varToggle === true ? "Up":"In"} Now`]
        const IDs = ["login-p-sign","login-p-login-span","login-p-create-ac"]
        IDs.map((el,index) => document.getElementById(el).textContent = textContents[index]  )
    }
    const handleVerification = (type) => {
        let object = Object.values(varinputs)
        object[0] = type
        if (object.indexOf("") === -1) {
            // En realidad no importa diferenciar si es un formulario de registro o de acceso, ya que atraves del input name lo podremos distingir en el servidor
            let config ={
                method: "POST",
                body: JSON.stringify(varinputs),
                headers: {
                  "Content-Type": "application/json"
                }}
            const fetching = async(url)=>{
                try {
                    const sending = await fetch(url,config)
                    const data = await sending.json()
                    if (Object.keys(data).length === 1) {
                        alert("No estamos aceptando Usuario ahora")
                    } else {
                        toggle(data)
                    }
                } catch (error) {
                    console.error(error)
                }
            }
            fetching("http://localhost:9000/user")
            resetInputs()
        } else {
            alert("Campos vacios")
        }
    }
    const handleIndetificationForm = (e) =>{
        e.preventDefault()
        if (varToggle === true) {
            handleVerification(varinputs.name)
        } 
        else {
            handleVerification(null)
        }
    }
    const resetInputs = () =>{
        setVarinputs(defaulInputs)
        const reset = [...document.getElementsByClassName("login-input-1")]
        reset.map(el => el.value = "")
    }
    const handleChange = (e) => {
        setVarinputs({
            ...varinputs, [e.target.name] : e.target.value
        })
    }
    return (
        <>
        <div className="login-pre-div">
            <div className="login-div">
                <div className="login-welcome-page">
                    <p className="login-title">Welcome Page</p>
                    <p className="login-p-sign" id="login-p-sign">Sign In To Your Account</p>
                </div>
                <div className="login-pre-form">
                    <p className="login-p-hello">Hello!</p>
                    <p className="login-p-gm">Good Morning</p>
                    <p className="login-p-login">
                        <span className="login-p-login-span" id="login-p-login-span">Login </span>
                         Your Account</p>
                    <form onSubmit={handleIndetificationForm} className="login-form">
                        {
                            varToggle === true &&
                            <>
                                <label htmlFor="name" className="login-label"></label>
                                <input className="login-input-1" type="text" placeholder="First Name" name="name" onChange={handleChange} />
                            </>
                        }
                        <label htmlFor="email" className="login-label"></label>
                        <input className="login-input-1" type="email" placeholder="Email Address" name="email" onChange={handleChange} />
                        <label htmlFor="password"className="login-label"></label>
                        <input className="login-input-1" type="password" placeholder="Password" name="password" onChange={handleChange} />
                        <div className="login-form-div">
                            <input type="checkbox" name="remember" id="login-label-remember"/>
                            <label htmlFor="login-label-remember" className="login-label-remember">Remember</label>
                            <a href="https://www.google.co.ve/" className="login-a-forgot" >Forgot Password?</a>
                        </div>
                        <label htmlFor="submit" className="login-label-submit" >SUBMIT</label>
                        <input name="submit" id="submit" type="submit" hidden={true} />
                        <p className="login-p-create-ac" id="login-p-create-ac" onClick={handleToggleForm}>Create Account</p>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default LogIn;