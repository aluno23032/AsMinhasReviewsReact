import React, { useEffect, useState } from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer.js"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

const Details = () => {

    const [username, setUsername] = useState("")
    const [usernameNovo, setUsernameNovo] = useState("")
    const [erro, setErro] = useState("")
    const [confirm, setConfirm] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const navigate = useNavigate()

    Axios.defaults.withCredentials = true;
    const details = () => {
        Axios.post("http://localhost:3001/details", {
            username: username, usernameNovo: usernameNovo
        }).then((response) => {
            setErro(response.data.erro)
            setConfirm(response.data.confirm)
        })
    }

    const email = () => {
        navigate('Email')
    }

    const password = () => {
        navigate('Password')
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.auth == true) {
                setLoginStatus(true)
                setUsername(response.data.user[0].Nome)
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
                    <h1>Detalhes do utilizador</h1>
                    <hr />
                    <div style={{ display: "flex" }}>
                        <div style={{marginRight:"24px"}}>
                        <button className="detailsButton">Nome de utilizador</button>
                        <br/>
                        <button onClick={email} className="detailsButtonSec">Email</button>
                        <br/>
                        <button onClick={password} className="detailsButtonSec">Palavra-passe</button>
                        </div>
                        <div>
                            <p className="RegText">Nome de utilizador</p>
                            <input className="input" type="text" placeholder={username} onChange={(e) => { setUsernameNovo(e.target.value) }}></input>
                            <p className="Confirm">{confirm}</p>
                            <p className="RegErro">{erro}</p>
                            <br />
                            <button onClick={details} className="mainButton">Alterar nome de utilizador</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Details