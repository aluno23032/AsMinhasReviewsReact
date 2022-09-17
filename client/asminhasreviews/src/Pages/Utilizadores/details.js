import React, { useEffect, useState } from "react"
import Navbar from './../../Components/Navbar/Navbar.js'
import Footer from "./../../Components/Footer/Footer.js"
import Axios from "axios"
import dateFormat from "dateformat"
import { useParams } from "react-router-dom"

const Index = () => {

    const [username, setUsername] = useState("")
    const { idUser } = useParams();
    const [textoCriar, setTextoCriar] = useState("")
    const [textoEditar, setTextoEditar] = useState("")
    const [barra, setBarra] = useState("")
    const [textoRemover, setTextoRemover] = useState("")
    const [listaReviews, setListaReviews] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/getReviewsUser", {
            params: { idUser }
        }).then((response) => {
            setListaReviews(response.data);
        });
        Axios.get("http://localhost:3001/getUsername", {
            params: { idUser }
        }).then((response) => {
            console.log(response)
            setUsername(response.data[0].Nome)
        });
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.auth == true) {
                setTextoCriar("Criar Review")
                setTextoEditar("Editar")
                setTextoRemover("Remover")
                setBarra(" | ")
            }
            setUsername(response.data.user[0].Nome)
        })
    }, [])

    return (
        <div style={{ textAlign: "center" }}>
            <Navbar />
            <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "1300px", marginBottom: "100px" }}>
                <div style={{ marginTop: "16px", textAlign: "left" }}>
                    <h1>Reviews de {username}</h1>
                    <div style={{ textAlign: "left" }}><a href="/Reviews/Create">{textoCriar}</a></div>
                    <hr></hr>
                </div>
                <table>
                    <tbody>
                        {listaReviews.map((val, key) => {
                            return (
                                <tr style={{ borderBottom: "1px solid #dee2e6", verticalAlign: "middle" }}>
                                    <td style={{ padding: "5px" }}>
                                        <div style={{ float: "left", width: "90%", textAlign: "left", fontSize: "13.5px" }}><a className="userLink" href={"../../Utilizadores/Details/" + val.Criador}>{val.JogoNome}</a></div>
                                        <div style={{ float: "left", width: "100%", textAlign: "left" }}><a style={{ textDecoration: "none" }} href={"../../Reviews/Details/" + val.Id}><h3 className="conteudoReview">{val.Conteudo}</h3></a></div>
                                        <div style={{ float: "left", width: "90%", textAlign: "left", fontSize: "13.5px" }}>
                                            {dateFormat(val.DataCriacao, "dd")}/{dateFormat(val.DataCriacao, "mm")}/{dateFormat(val.DataCriacao, "yyyy")}
                                        </div>
                                        <div style={{ float: "left", width: "100%", textAlign: "left", fontSize: "17.5px" }}>{val.Descricao}</div>
                                    </td>
                                    <td style={{width: "10%"}} ><h2>{val.Rating.toFixed(0)}<img style={{ marginLeft: "5px", marginBottom: "8px" }} height="25px" src="/favicon.ico "></img></h2></td>
                                    <td>
                                        <div style={{ whiteSpace: "nowrap", textAlign: "left" }}><a href={"/Review/Edit/" + val.Id}>{textoEditar}</a> {barra} <a href={"/Review/Remove/" + val.Id}>{textoRemover}</a></div>
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