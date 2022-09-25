import React, { useEffect, useState } from "react"
import Navbar from './../../Components/Navbar/Navbar.js'
import Footer from "./../../Components/Footer/Footer.js"
import Axios from "axios"
import dateFormat from "dateformat"
import { useParams, useNavigate } from "react-router-dom"

const Index = () => {

    const { idReview } = useParams();
    const [textoEditar, setTextoEditar] = useState("")
    const [barra, setBarra] = useState("")
    const [textoRemover, setTextoRemover] = useState("")
    const [listaReviews, setListaReviews] = useState([]);
    const [role, setRole] = useState("")
    const [idUser, setIdUser] = useState()
    const [idCriador, setIdCriador] = useState()
    const navigate = useNavigate()
    let userId

    //Comportamento ao clicar no botão de "upvote"
    const upvote = ((uservote, idReview, loginId) => () => {
        if (loginId) {
            //Se o utilizador já tiver dado "upvote"...
            if (uservote == 1) {      
                //Remover o "upvote" da review         
                Axios.post("http://localhost:3001/votoRemover", {
                    idReview: idReview, idUser: loginId
                }).then((response) => {
                    console.log(response);
                    if (response.data.apagado == "true") {
                        window.location.reload(false);
                    }
                })
            //Se o utilizador tiver dado "downvote"...
            } else if (uservote == -1) {
                //Mudar o valor do "upvote" da review
                Axios.post("http://localhost:3001/votoUpdate", {
                    idReview: idReview, idUser: loginId, valor: 1
                }).then((response) => {
                    console.log(response);
                    if (response.data.atualizado == "true") {
                        window.location.reload(false);
                    }
                })
            //Se o utilizador não tiver nenhum voto...
            } else {
                //Adicionar "upvote" da review
                Axios.post("http://localhost:3001/votoCreate", {
                    idReview: idReview, idUser: loginId, valor: 1
                }).then((response) => {
                    console.log(response);
                    if (response.data.criado == "true") {
                        window.location.reload(false);
                    }
                })
            }
            //Se o utilizador não estiver autenticado...
        } else {
            //Mudar para a página de login
            navigate("/Account/Login")
        }
    })

    //Comportamento ao clicar no botão de "downvote"
    const downvote = ((uservote, idReview, loginId) => () => {
        if (loginId) {
            //Se o utilizador tiver dado "upvote"...
            if (uservote == 1) {
                //Mudar o valor do "downvote" da review
                Axios.post("http://localhost:3001/votoUpdate", {
                    idReview: idReview, idUser: loginId, valor: -1
                }).then((response) => {
                    console.log(response);
                    if (response.data.atualizado == "true") {
                        window.location.reload(false);
                    }
                })
            //Se o utilizador já tiver dado "downvote"...
            } else if (uservote == -1) {
                //Remover o "downvote" da review
                Axios.post("http://localhost:3001/votoRemover", {
                    idReview: idReview, idUser: loginId
                }).then((response) => {
                    console.log(response);
                    if (response.data.apagado == "true") {
                        window.location.reload(false);
                    }
                })
            //Se o utilizador não tiver nenhum voto
            } else {
                //Adicionar "downvote" da review
                Axios.post("http://localhost:3001/votoCreate", {
                    idReview: idReview, idUser: loginId, valor: -1
                }).then((response) => {
                    console.log(response);
                    if (response.data.criado == "true") {
                        window.location.reload(false);
                    }
                })
            }
            //Se o utilizador não estiver autenticado...
        } else {
            //Mudar para a página de login
            navigate("/Account/Login")
        }
    })

    useEffect(() => {
        //Se o utilizador for o criador da review ou se for administrador, mostrar hiperligações para editar e remover o jogo
        Axios.get("http://localhost:3001/login").then((response) => {
            setRole(response.data.user[0].RoleId)
            setIdUser(response.data.user[0].Id)
            if (role === "a" || idUser === idCriador) {
                setTextoEditar("Editar")
                setTextoRemover("Remover")
                setBarra(" | ")
            }
            userId = response.data.user[0].Id
            //Buscar as informações da review
            Axios.get("http://localhost:3001/getReview", {
            params: { idReview, userId }
        }).then((response) => {
            setListaReviews(response.data);
            setIdCriador(response.data[0].Id)
        });
        })
        
        
    }, [])

    return (
        <div style={{ textAlign: "center" }}>
            <Navbar />
            <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "1300px", marginBottom: "100px" }}>
                <div style={{ marginTop: "16px", textAlign: "left" }}>
                    <h1>Detalhes da review</h1>
                    <hr></hr>
                </div>
                <table style={{ width: "100%" }}>
                    <tbody>
                        {listaReviews.map((val, key) => {
                            return (
                                <tr style={{ borderBottom: "1px solid #dee2e6", verticalAlign: "middle" }}>
                                    <td style={{ display: "block", textAlign: "center", marginRight: "10px", marginTop: "15px", marginBottom: "15px" }}>
                                        <div onClick={upvote(val.uservote, val.Id, idUser)} className={val.upvoteName}></div>
                                        <h2 style={{ marginBottom: "5px" }}>{val.upvotes}</h2>
                                        <div onClick={downvote(val.uservote, val.Id, idUser)} className={val.downvoteName}></div>
                                    </td>
                                    <td style={{ padding: "5px", width: "90%" }}>
                                        <div style={{ float: "left", width: "100%", textAlign: "left" }}><a style={{ textDecoration: "none" }} href={"../../Reviews/Details/" + val.Id}><h3 style={{ marginBottom: "0px" }} className="conteudoReview">{val.JogoNome}</h3></a></div>
                                        <div style={{ float: "left", width: "90%", textAlign: "left", fontSize: "13.5px" }}><a className="userLink" href={"../../Utilizadores/Details/" + val.Criador}>{val.CriadorNome}</a></div>
                                        <div style={{ float: "left", width: "90%", textAlign: "left" }}><p>{val.Conteudo}</p></div>
                                        <div style={{ float: "left", width: "90%", textAlign: "left", fontSize: "13.5px" }}>
                                            {dateFormat(val.DataCriacao, "dd")}/{dateFormat(val.DataCriacao, "mm")}/{dateFormat(val.DataCriacao, "yyyy")}
                                        </div>
                                        <div style={{ float: "left", width: "100%", textAlign: "left", fontSize: "17.5px" }}>{val.Descricao}</div>
                                    </td>
                                    <td style={{ width: "10%" }} ><h2>{val.Rating.toFixed(0)}<img style={{ marginLeft: "5px", marginBottom: "8px" }} height="25px" src="/favicon.ico "></img></h2></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br></br>
                <div style={{ whiteSpace: "nowrap", textAlign: "left" }}><a href={"/Reviews/Edit/" + idReview}>{textoEditar}</a> {barra} <a href={"/Reviews/Remove/" + idReview}>{textoRemover}</a></div>
            </div>
            <Footer />
        </div>
    );
}

export default Index