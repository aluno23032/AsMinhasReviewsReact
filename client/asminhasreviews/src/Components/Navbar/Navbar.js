import React, { useEffect, useState } from "react"
import logo from './estrela.png';
import Axios from "axios"
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const [userId, setUserId] = useState()
    const [usernameTexto, setUsernameTexto] = useState("")
    const [logoutTexto, setLogoutTexto] = useState("")
    const [registerTexto, setRegisterTexto] = useState("Registar")
    const [loginTexto, setLoginTexto] = useState("Login")
    const [reviewsTexto, setReviewsTexto] = useState("")

    const navigate = useNavigate()

    Axios.defaults.withCredentials = true;

    const logout = () => {
        Axios.post("http://localhost:3001/logout", {})
        navigate('/')  
        setTimeout(function() {
            window.location.reload(false);
        }.bind(this),50)   
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login", {
        }).then((response) => {
            if (response.data.auth == true) {
                setUserId(response.data.user[0].Id)
                setUsernameTexto("Olá " + response.data.user[0].Nome + "!")
                setLogoutTexto("Logout")
                setRegisterTexto("")
                setLoginTexto("")
                setReviewsTexto("As minhas reviews")
            } else {
                setLogoutTexto("")
                setRegisterTexto("Registar")
                setLoginTexto("Login")
                setUsernameTexto("")
                setReviewsTexto("")
            }
        })
    }, [])
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ borderBottom: "1px solid #dee2e6" }}>
                <a className="navbar-brand" href="/" style={{ marginLeft: '16%', }}>
                    As Minhas Reviews <img height="15px" src={logo} style={{ marginBottom: '4px' }} />
                </a>
                <ul style={{ flexGrow: "1" }} className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/Jogos/Index/Rating">
                            Os melhores jogos
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Jogos/Index/DataLancamento">
                            Os jogos mais recentes
                        </a>
                    </li>
                </ul>
                <ul style={{ float: "right", marginRight: "16%" }} className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/Account/Register">
                            {registerTexto}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Account/Login">
                            {loginTexto}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={"/Utilizadores/" + userId}>
                            {reviewsTexto}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Account/Details">
                            {usernameTexto}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={logout}>
                            {logoutTexto}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar