import React, { useEffect, useState } from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer.js"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

const Email = () => {

    const [email, setEmail] = useState("")
    const [emailNovo, setEmailNovo] = useState("")
    const [erro, setErro] = useState("")
    const [confirm, setConfirm] = useState("")
    const navigate = useNavigate()

    //Manter cookies
    Axios.defaults.withCredentials = true;

    //Efetua a mudança do email da conta autenticada
    const changeEmail = () => {
        if (/\S+@\S+\.\S+/.test(emailNovo)) {
            Axios.post("http://localhost:3001/changeEmail", {
                email: email, emailNovo: emailNovo
            }).then((response) => {
                setErro(response.data.erro)
                setConfirm(response.data.confirm)
            })
        } else {
            setErro("Por favor introduza um email válido.")
        }
    }

    const username = () => {
        //Mudar para a página de mudança de nome de utilizador
        navigate('/Account/Details')
    }

    const password = () => {
        //Mudar para a página de mudança de palavra-passe
        navigate('/Account/Details/Password')
    }

    useEffect(() => {
        //Se o utilizador não estiver autenticado, mudar para a página principal
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.auth == true) {
                setEmail(response.data.user[0].Email)
            } else {
                navigate('/')
            }
        })
    }, [])

        return (
            <div>
                <Navbar />
                <div style={{ marginTop: "10px", float: "left", marginLeft: "16%", textAlign: "left" }}>
                    <h1>Gerir utilizador</h1>
                    <hr />
                    <div style={{ display: "flex" }}>
                        <div style={{ marginRight: "24px" }}>
                            <button onClick={username} className="detailsButtonSec">Nome de Utilizador</button>
                            <br />
                            <button className="detailsButton">Email</button>
                            <br />
                            <button onClick={password} className="detailsButtonSec">Palavra-passe</button>
                        </div>
                        <div>
                            <p className="RegText">Email</p>
                            <input className="input" type="text" placeholder={email} onChange={(e) => { setEmailNovo(e.target.value) }}></input>
                            <p className="Confirm">{confirm}</p>
                            <p className="RegErro">{erro}</p>
                            <br />
                            <button onClick={changeEmail} className="mainButton">Alterar email</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

export default Email