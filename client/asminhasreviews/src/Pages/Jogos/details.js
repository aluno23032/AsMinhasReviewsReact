import React, { useEffect, useState } from "react"
import Navbar from './../../Components/Navbar/Navbar.js'
import Footer from "./../../Components/Footer/Footer.js"
import Axios from "axios"
import dateFormat from "dateformat"
import { useParams } from "react-router-dom"

const Index = () => {

    const [listaJogos, setListaJogos] = useState([]);
    const [imagePath] = useState("/Fotos/");
    const { idJogo } = useParams();
    const [textoEditar, setTextoEditar] = useState("")
    const [barra, setBarra] = useState("")
    const [textoRemover, setTextoRemover] = useState("")
    const [listaFotos, setListaFotos] = useState([]);
    const [listaReviews, setListaReviews] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/getJogo", {
            params: { idJogo }
        }).then((response) => {
            setListaJogos(response.data);
            for (let i = 0; i < response.data[0].NumeroImgs; i++) {
                setListaFotos(listaFotos => [...listaFotos, response.data[0].NomeFormatado + (i + 1) + ".png"])
            }
        });
        Axios.get("http://localhost:3001/getReviewsJogo", {
            params: { idJogo }
        }).then((response) => {
            setListaReviews(response.data);
        });
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.user[0].RoleId == "a") {
                setTextoEditar("Editar")
                setTextoRemover("Remover")
                setBarra(" | ")
            }
        })
    }, [])

    return (
        <div style={{ textAlign: "center" }}>
            <Navbar />
            <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "1300px", marginBottom: "100px" }}>
                <table>
                    <tbody>
                        {listaJogos.map((val, key) => {
                            return (
                                <tr style={{ height: "225px", borderBottom: "1px solid #dee2e6", verticalAlign: "middle" }}>
                                    <td style={{ paddingRight: "10px" }}>
                                        <img height="175px" src={imagePath + val.Capa}></img>
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        <div style={{ float: "right" }}><h2>{val.Rating.toFixed(1)}<img style={{ marginLeft: "5px", marginBottom: "8px" }} height="25px" src="/favicon.ico "></img></h2></div>
                                        <div style={{ float: "left", width: "90%", textAlign: "left" }}><h3 className="titulo">{val.Nome}</h3></div>
                                        <div style={{ float: "left", width: "90%", textAlign: "left", fontSize: "13.5px" }}>Plataformas: {val.Plataformas}</div>
                                        <div style={{ float: "left", width: "90%", textAlign: "left", fontSize: "13.5px" }}>
                                            {dateFormat(val.DataLancamento, "dd")}/{dateFormat(val.DataLancamento, "mm")}/{dateFormat(val.DataLancamento, "yyyy")}
                                        </div>
                                        <div style={{ float: "left", width: "100%", textAlign: "left", fontSize: "17.5px" }}>{val.Descricao}</div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div style={{ marginTop: "16px", textAlign: "left" }}>
                    <h3>Fotografias</h3>
                    {listaFotos.map((val, key) => {
                        return (
                            <img style={{ width: "23%", height: "168.333333px", float: "left", marginRight: "10px", marginBottom: "10px" }} src={imagePath + val}></img>
                        )
                    })}
                    
                </div>
                <div style={{ whiteSpace: "nowrap", marginTop: "200px", textAlign: "left" }}><hr></hr><h3>Reviews</h3></div>
                <table>
                    <tbody>
                        {listaReviews.map((val, key) => {
                            return (
                                <tr style={{ borderBottom: "1px solid #dee2e6", verticalAlign: "middle" }}>
                                    <td style={{ padding: "5px" }}>
                                        <div style={{ float: "left", width: "90%", textAlign: "left", fontSize: "13.5px" }}><a className="userLink" href={"../../Utilizadores/" + val.Criador}>{val.CriadorNome}</a></div>
                                        <div style={{ float: "right" }}><h2>{val.Rating.toFixed(0)}<img style={{ marginLeft: "5px", marginBottom: "8px" }} height="25px" src="/favicon.ico "></img></h2></div>
                                        <div style={{ float: "left", width: "90%", textAlign: "left" }}><a style ={{textDecoration: "none"}} href = {"../../Reviews/Details/" + val.Id}><h3 className="conteudoReview">{val.Conteudo}</h3></a></div>
                                        <div style={{ float: "left", width: "90%", textAlign: "left", fontSize: "13.5px" }}>
                                            {dateFormat(val.DataCriacao, "dd")}/{dateFormat(val.DataCriacao, "mm")}/{dateFormat(val.DataCriacao, "yyyy")}
                                        </div>
                                        <div style={{ float: "left", width: "100%", textAlign: "left", fontSize: "17.5px" }}>{val.Descricao}</div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div style={{ whiteSpace: "nowrap", marginTop: "16px", textAlign: "left" }}><a href={"/Jogos/Edit/" + idJogo}>{textoEditar}</a> {barra} <a href={"/Jogos/Remove/" + idJogo}>{textoRemover}</a></div>
            </div>
            <Footer />
        </div>
    );
}

export default Index