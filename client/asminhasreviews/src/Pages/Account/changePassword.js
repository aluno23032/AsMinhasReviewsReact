import React, { useEffect, useState } from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer.js"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

const ChangePassword = () => {

    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [erro, setErro] = useState("")
    const [confirm, setConfirm] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const navigate = useNavigate()

    Axios.defaults.withCredentials = true;
    //Efetua a mudança da password de uma conta existente
    const changePassword = () => {
        if(password != passwordConfirm){
            setErro("A palavra-passe não corresponde à confirmação.")
        } else if (password.length>8 && password.length<32) {
            setErro("Por favor introduza uma palavra-passe entre 8 e 32 caracteres.")
        } else {
        Axios.post("http://localhost:3001/details", {
            password: password
        }).then((response) => {
            setErro(response.data.erro)
            setConfirm(response.data.confirm)
        })}
    }

    const email = () => {
        navigate('/Account/Details/Email')
    }

    const details = () => {
        navigate('/Account/Details')
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.auth == true) {
                setLoginStatus(true)
            }
        })
    }, [])

    if (loginStatus == false) {
        return (
            <div>
                <Navbar />
                <div style={{ marginTop: "10px", float: "left", marginLeft: "16%", textAlign: "left" }}>
                    <p>O utilizador não está autenticado.</p>
                </div>
                <Footer />
            </div>
        )
    } else {
        return (
            <div>
                <Navbar />
                <div style={{ marginTop: "10px", float: "left", marginLeft: "16%", textAlign: "left" }}>
                    <h1>Gerir utilizador</h1>
                    <hr />
                    <div style={{ display: "flex" }}>
                        <div style={{marginRight:"24px"}}>
                        <button onClick={details} className="detailsButtonSec">Nome de utilizador</button>
                        <br/>
                        <button onClick={email} className="detailsButtonSec">Email</button>
                        <br/>
                        <button className="detailsButton">Palavra-passe</button>
                        </div>
                        <div>
                            <p className="RegText">Palavra-passe</p>
                            <input className="input" type="password" onChange={(e) => { setPassword(e.target.value) }}></input>
                            <p className="RegText">Confirmar palavra-passe</p>
                            <input className="input" type="password" onChange={(e) => { setPasswordConfirm(e.target.value) }}></input>
                            <p className="Confirm">{confirm}</p>
                            <p className="RegErro">{erro}</p>
                            <br />
                            <button onClick={changePassword} className="mainButton">Alterar palavra-passe</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default ChangePassword