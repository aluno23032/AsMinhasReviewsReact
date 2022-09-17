import React, { useEffect, useState } from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer.js"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [username, setUsername] = useState("")
    const [usernameStatus, setUsernameStatus] = useState("")
    const [passwordStatus, setPasswordStatus] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    Axios.defaults.withCredentials = true;
    const login = () => {
        Axios.post("http://localhost:3001/login", {
            username: username, password: password
        }).then((response) => {
            setPasswordStatus(response.data.message1)
            setUsernameStatus(response.data.message2)
            if (response.data.auth == true) {
                navigate('../..')
            }
        })
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.auth == true) {
                navigate('../..')
            }
        })
    }, [])

    return (
        <div>
            <Navbar />
            <div style={{ marginTop: "10px", float: "left", marginLeft: "16%", textAlign: "left" }}>
                <h1>Login</h1>
                <br />
                <p className="RegText">Nome de utilizador</p>
                <input className="input" type="text" onChange={(e) => { setUsername(e.target.value) }}></input>
                <p className="RegErro">{usernameStatus}</p>
                <br />
                <p className="RegText">Palavra-passe</p>
                <input className="input" type="password" onChange={(e) => { setPassword(e.target.value) }}></input>
                <p className="RegErro">{passwordStatus}</p>
                <br />
                <button onClick={login} className="mainButton">Login</button>
                <br />
                <a href="../Register">Registar um novo utilizador</a>
            </div>
            <Footer />
        </div>
    )
}

export default Login