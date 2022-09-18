import React, { useEffect, useState } from "react"
import Navbar from './../../Components/Navbar/Navbar.js'
import Footer from "./../../Components/Footer/Footer.js"
import Axios from "axios"
import dateFormat from "dateformat"
import { useParams } from "react-router-dom"

const Index = () => {

    const [username, setUsername] = useState("")
    let userId
    const { idCriador } = useParams();
    const [textoCriar, setTextoCriar] = useState("")
    const [textoEditar, setTextoEditar] = useState("")
    const [barra, setBarra] = useState("")
    const [textoRemover, setTextoRemover] = useState("")
    const [listaReviews, setListaReviews] = useState([]);
    let downvoteClass = "DownVote"
    let upvoteClass = "UpVote"

    const upvote = () => {
        window.location.reload(false);
    }

    const downvote = () => {
        window.location.reload(false);
    }

    const checkVote = (voto) => {
        if (voto === 1) {
            upvoteClass = "UpVote2"
        } else if (voto === -1) {
            downvoteClass = "DownVote2"
        }
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.user[0].RoleId === "a" || response.data.user[0].Id === idCriador) {
                setTextoCriar("Criar Review")
                setTextoEditar("Editar")
                setTextoRemover("Remover")
                setBarra(" | ")
            }
            setUsername(response.data.user[0].Nome)
            userId = response.data.user[0].Id
            Axios.get("http://localhost:3001/getReviewsUser", {
                params: { idCriador, userId }
            }).then((response) => {
                setListaReviews(response.data);
            });
        })
        Axios.get("http://localhost:3001/getUsername", {
            params: { idCriador }
        }).then((response) => {
            console.log(response)
            setUsername(response.data[0].Nome)
        });
    }, [])

    return (
        <div style={{ textAlign: "center" }}>
            <Navbar />
            <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "1300px", marginBottom: "100px" }}>
                <div style={{ marginTop: "16px", textAlign: "left" }}>
                    <h1>Reviews de {username}</h1>
                    <div style={{ textAlign: "left" }}><a href="/Reviews/Create">{textoCriar}</a></div>
                    <hr style={{ marginBottom: "0px" }}></hr>
                </div>
                <table>
                    <tbody>
                        {listaReviews.map((val, key) => {
                            checkVote(val.uservote)
                            return (
                                <tr style={{ borderBottom: "1px solid #dee2e6", verticalAlign: "middle" }}>
                                    <td style={{ display: "block", textAlign: "center", marginRight: "10px", marginTop: "15px", marginBottom: "15px" }}>
                                        <div onClick={upvote} className={upvoteClass}></div>
                                        <h2 style={{ marginBottom: "5px" }}>{val.upvotes}</h2>
                                        <div onClick={downvote} className={downvoteClass}></div>
                                    </td>
                                    <td style={{ padding: "5px", width: "90%" }}>
                                        <div style={{ float: "left", width: "90%", textAlign: "left", fontSize: "13.5px" }}><a className="userLink" href={"../../Utilizadores/Details/" + val.Criador}>{val.JogoNome}</a></div>
                                        <div style={{ float: "left", width: "100%", textAlign: "left" }}><a style={{ textDecoration: "none" }} href={"../../Reviews/Details/" + val.Id}><h3 className="conteudoReview">{val.Conteudo}</h3></a></div>
                                        <div style={{ float: "left", width: "90%", textAlign: "left", fontSize: "13.5px" }}>
                                            {dateFormat(val.DataCriacao, "dd")}/{dateFormat(val.DataCriacao, "mm")}/{dateFormat(val.DataCriacao, "yyyy")}
                                        </div>
                                        <div style={{ float: "left", width: "100%", textAlign: "left", fontSize: "17.5px" }}>{val.Descricao}</div>
                                    </td>
                                    <td style={{ width: "10%" }} ><h2>{val.Rating.toFixed(0)}<img style={{ marginLeft: "5px", marginBottom: "8px" }} height="25px" src="/favicon.ico "></img></h2></td>
                                    <td>
                                        <div style={{ whiteSpace: "nowrap", textAlign: "left" }}><a href={"/Reviews/Edit/" + val.Id}>{textoEditar}</a> {barra} <a href={"/Reviews/Remove/" + val.Id}>{textoRemover}</a></div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
            <Footer />
        </div>
    );
}

export default Index