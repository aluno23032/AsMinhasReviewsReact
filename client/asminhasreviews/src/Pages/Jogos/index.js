import React, { useEffect, useState } from "react"
import Navbar from './../../Components/Navbar/Navbar.js'
import Footer from "./../../Components/Footer/Footer.js"
import Axios from "axios"
import dateFormat from "dateformat"
import { useParams } from "react-router-dom"

const Index = () => {

    const [listaJogos, setListaJogos] = useState([]);
    const [imagePath] = useState("/Fotos/");
    const { ordem } = useParams();
    const [textoCriar, setTextoCriar] = useState("")
    const [textoEditar, setTextoEditar] = useState("")
    const [barra, setBarra] = useState("")
    const [textoRemover, setTextoRemover] = useState("")

    useEffect(() => {
        Axios.get("http://localhost:3001/listajogos", {
            params: { ordem }
        }).then((response) => {
            setListaJogos(response.data);
        });
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.user[0].RoleId == "a") {
                setTextoCriar("Criar Jogo")
                setTextoEditar("Editar")
                setTextoRemover("Remover")
                setBarra(" | ")
            }
        })
    }, [])
//Personalização da pagina
    return (
        <div style={{ textAlign: "center" }}>
            <Navbar />
            <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "1300px", marginBottom: "100px" }}>
                <h1 style={{ marginTop: "20px", textAlign: "left" }}>Lista de jogos</h1>
                <div style={{ textAlign: "left" }}><a href="/Jogos/Create">{textoCriar}</a></div>
                <hr style={{ marginBottom: "5px" }}></hr>
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
                                        <div style={{ float: "left", width: "90%", textAlign: "left" }}><a className="tituloLink" href={"/Jogos/Details/" + val.Id}><h3 className="tituloLink">{key + 1}. {val.Nome}</h3></a></div>
                                        <div style={{ float: "left", width: "90%", textAlign: "left" }}>Plataformas: {val.Plataformas}</div>
                                        <div style={{ float: "left", width: "90%", textAlign: "left" }}>
                                            {dateFormat(val.DataLancamento, "dd")}/{dateFormat(val.DataLancamento, "mm")}/{dateFormat(val.DataLancamento, "yyyy")}
                                        </div>
                                        <div style={{ float: "left", width: "100%", textAlign: "left" }}>{val.Descricao}</div>
                                    </td>
                                    <td>
                                        <div style={{ whiteSpace: "nowrap" }}><a href={"/Jogos/Edit/" + val.Id}>{textoEditar}</a> { barra } <a href={"/Jogos/Remove/" + val.Id}>{textoRemover}</a></div>
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