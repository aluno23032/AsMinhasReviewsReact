import React, { useState } from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer.js"
import Axios from "axios"
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState("")
    const [usernameStatus, setUsernameStatus] = useState("")
    const [email, setEmail] = useState("")
    const [emailStatus, setEmailStatus] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordStatus, setConfirmPasswordStatus] = useState("")
    const navigate = useNavigate();

    const register = () => {
        if (password != confirmPassword) {
            setConfirmPasswordStatus("A palavra-passe não coincide com a confirmação.");
        }
        else {
            Axios.post("http://localhost:3001/register", {
                username: username, email: email, password: password
            }).then((response) => {
                    setUsernameStatus(response.data.message1)
                    setEmailStatus(response.data.message2)
                    console.log(response);
                    if(response.data.registado == "true") {
                        navigate("/");
                    }
            })
        }
    }

    return (
        <div>
            <Navbar />
            <div style={{ marginTop: "10px", float: "left", marginLeft: "16%", textAlign: "left" }}>
                <h1>Registar</h1>
                <br />
                <p className="RegErro">{usernameStatus}</p>
                <p className="RegText">Nome de utilizador</p>
                <input className="input" type="text" onChange={(e) => { setUsername(e.target.value) }}></input>
                <br />
                <br />
                <p className="RegErro">{emailStatus}</p>
                <p className="RegText">Email</p>
                <input className="input" type="text" onChange={(e) => { setEmail(e.target.value) }}></input>
                <br />
                <br />
                <p className="RegText">Palavra-passe</p>
                <input className="input" type="password" onChange={(e) => { setPassword(e.target.value) }}></input>
                <br />
                <br />
                <p className="RegErro">{confirmPasswordStatus}</p>
                <p className="RegText">Confirmar palavra-passe</p>
                <input className="input" type="password" onChange={(e) => { setConfirmPassword(e.target.value) }}></input>
                <br />
                <br />
                <button onClick={register} className="mainButton">Registar</button>
            </div>
            <Footer />
        </div>
    )
}

export default Register