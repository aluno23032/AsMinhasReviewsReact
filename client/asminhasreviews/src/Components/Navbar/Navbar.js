import React, { useEffect, useState } from "react"
import logo from './estrela.png';
import Axios from "axios"

const Navbar = () => {

    const [loginStatus, setLoginStatus] = useState(false)
    const [username, setUsername] = useState("")

    Axios.defaults.withCredentials = true;

    const logout = () => {
        Axios.post("http://localhost:3001/logout", {}).then((response) => {
            setLoginStatus(false)
        })
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login", {
        }).then((response) => {
            if(response.data.auth == true) {
                setUsername(response.data.user[0].Nome)
                setLoginStatus(true)
            }
        })
    }, [])

    if (loginStatus == false) {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ borderBottom: "1px solid #dee2e6" }}>
                    <a className="navbar-brand" href="/" style={{ marginLeft: '16%', }}>
                        As Minhas Reviews <img height="15px" src={logo} style={{ marginBottom: '4px' }} />
                    </a>
                    <ul style={{ flexGrow: "1" }} className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="Jogos">
                                Os melhores jogos
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="Jogos">
                                Os jogos mais recentes
                            </a>
                        </li>
                    </ul>
                    <ul style={{ float: "right", marginRight: "16%" }} className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/Account/Register">
                                Registar
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Account/Login">
                                Login
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    } else {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ borderBottom: "1px solid #dee2e6" }}>
                    <a className="navbar-brand" href="/" style={{ marginLeft: '16%', }}>
                        As Minhas Reviews <img height="15px" src={logo} style={{ marginBottom: '4px' }} />
                    </a>
                    <ul style={{ flexGrow: "1" }} className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="Jogos">
                                Os melhores jogos
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="Jogos">
                                Os jogos mais recentes
                            </a>
                        </li>
                    </ul>
                    <ul style={{ float: "right", marginRight: "16%" }} className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/Account/Details">
                                Olá {username}!
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={logout}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

}

export default Navbar