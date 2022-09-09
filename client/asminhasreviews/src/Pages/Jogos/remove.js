import React, { useEffect, useState } from "react"
import Navbar from './../../Components/Navbar/Navbar.js'
import Footer from "./../../Components/Footer/Footer.js"
import Axios from "axios"
import dateFormat from "dateformat"
import { useParams } from "react-router-dom"

const Index = () => {

    const [listaJogos, setListaJogos] = useState([]);
    const [imagePath] = useState("/Fotos/");
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState()
    const { idJogo } = useParams();

    useEffect(() => {
        Axios.get("http://localhost:3001/getJogo", {
            params: { idJogo }
        }).then((response) => {
            setListaJogos(response.data);
        });
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.user[0].RoleId == "a") {
                setRole("a")
            }
            if (response.data.user[0])
                setUserId(response.data.user[0].Id)
        })
    }, [])

    if (role != "a") {
        return (
            <div style={{ textAlign: "center" }}>
                <Navbar />
                <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "1300px", marginBottom: "100px" }}></div>
                <Footer />
            </div>
        )
    } else {
        return (
            <div style={{ textAlign: "center" }}>
                <Navbar />
                <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "1300px", marginBottom: "100px" }}>
                    <h1 style={{ marginTop: "20px", textAlign: "left" }}>Remover jogo</h1>
                    <hr style={{ marginBottom: "5px" }}></hr>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <b>Nome:</b>
                                </td>
                                <td>
                                    {listaJogos[0].Nome}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Capa:</b>
                                </td>
                                <td style={{ paddingRight: "10px" }}>
                                    <img height="175px" src={imagePath + listaJogos[0].Capa}></img>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Plataformas:</b>
                                </td>
                                <td>
                                    {listaJogos[0].Plataformas}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Rating:</b>
                                </td>
                                <td>
                                    {listaJogos[0].Rating}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Data de Lancamento:</b>
                                </td>
                                <td>
                                    {dateFormat(listaJogos[0].DataLancamento, "dd")}/{dateFormat(listaJogos[0].DataLancamento, "mm")}/{dateFormat(listaJogos[0].DataLancamento, "yyyy")}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Descrição:</b>
                                </td>
                                <td>
                                    {listaJogos[0].Descricao}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Fotos:</b>
                                </td>
                                <td style={{ paddingRight: "10px" }}>
                                    <img height="175px" src={imagePath + listaJogos[0].Capa}></img>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Index