import React, { useEffect, useState } from "react"
import Navbar from './../../Components/Navbar/Navbar.js'
import Footer from "./../../Components/Footer/Footer.js"
import Axios from "axios"
import dateFormat from "dateformat"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const Index = () => {

    const { idReview } = useParams();
    const [listaReviews, setListaReviews] = useState([]);
    const [nomeCriador, setNomeCriador] = useState()
    const [jogoNome, setJogoNome] = useState("")
    const [idCriador, setIdCriador] = useState()
    const navigate = useNavigate()
    
    const reviewRemover = () => {
        //Remover review
        Axios.post("http://localhost:3001/removerReview", {
            idReview: idReview
        }).then((response) => {
            console.log(response);
            //Se a remoção for válida, mudar para a página com as reviews do utilizador
            if (response.data.apagado == "true") {
                Axios.post("http://localhost:3001/atualizarRating", {
                            jogoNome: jogoNome
                        })
                navigate("/Utilizadores/" + idCriador);
            }
        });
    }

    useEffect(() => {
        //Buscar informação da review
        Axios.get("http://localhost:3001/getReview", {
            params: { idReview }
        }).then((response) => {
            setListaReviews(response.data);
            setNomeCriador(response.data[0].CriadorNome)
            setJogoNome(response.data[0].JogoNome)
            setIdCriador(response.data[0].CriadorId)
        });
        Axios.get("http://localhost:3001/login").then((response) => {
            //Se o utilizador não estiver autenticado, mudar para a página de login    
            if (response.data.auth == false) {
                navigate("/Account/Login/")
            }
            //Se o utilizador não for o criador da review e não for administrador, mudar para a página de reviews do criador
            if (response.data.user[0].RoleId != "a" && response.data.user[0].Nome != nomeCriador) {
                navigate("/Utilizadores/" + response.data[0].CriadorId)
            }
        })
    }, [])

    return (
        <div style={{ textAlign: "center" }}>
            <Navbar />
            <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "1300px", marginBottom: "100px" }}>
                <div style={{ marginTop: "16px", textAlign: "left" }}>
                    <h1>Remover review</h1>
                    <hr></hr>
                </div>
                <table style={{ width: "40%" }}>
                    <tbody style={{ textAlign: "left", verticalAlign: "top" }}>
                        {listaReviews.map((val, key) => {
                            return (
                                <><tr>
                                    <td>
                                        <b>Conteúdo</b>
                                    </td>
                                    <td style={{ marginBottom: "10px", display: "block" }}>
                                        {val.Conteudo}
                                    </td>
                                </tr><tr>
                                        <td>
                                            <b>Rating</b>
                                        </td>
                                        <td style={{ marginBottom: "10px", display: "block" }}>
                                            {val.Rating}
                                        </td>
                                    </tr><tr>
                                        <td>
                                            <b>Data de criação</b>
                                        </td>
                                        <td style={{ marginBottom: "10px", display: "block" }}>
                                            {dateFormat(val.DataCriacao, "dd")}/{dateFormat(val.DataCriacao, "mm")}/{dateFormat(val.DataCriacao, "yyyy")}
                                        </td>
                                    </tr><tr>
                                        <td>
                                            <b>Criador</b>
                                        </td>
                                        <td style={{ marginBottom: "10px", display: "block" }}>
                                            {val.CriadorNome}
                                        </td>
                                    </tr><tr>
                                        <td>
                                            <b>Jogo</b>
                                        </td>
                                        <td style={{ marginBottom: "10px", display: "block" }}>
                                            {val.JogoNome}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button className="btnRemover" onClick={reviewRemover}>Remover</button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
                <br></br>
            </div>
            <Footer />
        </div>
    );
}

export default Index