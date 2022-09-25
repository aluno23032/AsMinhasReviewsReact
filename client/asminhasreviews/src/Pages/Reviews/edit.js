import React, { useEffect, useState } from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer.js"
import Axios from "axios"
import { useParams, useNavigate } from "react-router-dom";

const EditarReview = () => {

    const [conteudo, setConteudo] = useState("")
    const [rating, setRating] = useState()
    const { idReview } = useParams();
    const [conteudoErro, setConteudoErro] = useState("")
    const [ratingErro, setRatingErro] = useState("")
    const [role, setRole] = useState("")
    const [idUser, setIdUser] = useState()
    const [idCriador, setIdCriador] = useState()
    const [idJogo, setIdJogo] = useState()
    
    const navigate = useNavigate()
//Introduçao de uma descrição, rating de uma review existente de um jogo por um utilizador.
    const reviewEditar = () => {
        setConteudoErro("")
        if (conteudo.length < 1) {
            setConteudoErro("Introduza a descrição do jogo")
        } else
            if (rating < 0 || rating > 10 || rating === undefined) {
                setRatingErro("Introduza um valor válido")
            } else {
                Axios.post("http://localhost:3001/reviewEditar", {
                    idReview: idReview, conteudo: conteudo, rating: rating
                }).then((response) => {
                    console.log(response);
                    if (response.data.editado == "true") {
                        Axios.post("http://localhost:3001/atualizarRating", {
                            jogoId: idJogo
                        })
                        navigate("/Utilizadores/" + idUser);
                    }
                })
            }
    }
    //Verificar utilizador
    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.auth == false) {
                navigate("/Account/Login/")
            }
            if (response.data.user[0].RoleId == "a") {
                setRole("a")
            }
            setIdUser(response.data.user[0].Id)
        })
        //Verificar review de um jogo
        Axios.get("http://localhost:3001/getReview", {
            params: { idReview }
        }).then((response) => {
            setConteudo(response.data[0].Conteudo);
            setRating(response.data[0].Rating);
            setIdCriador(response.data[0].Criador)
            setIdJogo(response.data[0].Jogo)
        });
    }, [])
//Personalização da pagina
    if (role != "a" && idUser != idCriador) {
        return (
            <div>
                <Navbar />
                <div style={{ marginTop: "10px", float: "left", marginLeft: "16%", textAlign: "left", width: "1300px" }}>
                    A edição de uma review é exclusiva ao seu criador.
                </div>
                <Footer />
            </div>
        )
    } else {
        return (
            <div>
                <Navbar />
                <div style={{ marginTop: "10px", float: "left", marginLeft: "16%", textAlign: "left", width: "1300px" }}>
                    <h1>Editar review</h1>
                    <hr />
                    <p className="RegText">Conteúdo</p>
                    <textarea className="input" value={conteudo} type="text" style={{ height: "150px" }} onChange={(e) => { setConteudo(e.target.value) }}></textarea>
                    <p className="RegErro">{conteudoErro}</p>
                    <br />
                    <p className="RegText">Rating</p>
                    <input className="input" type="number" value={rating} style={{ height: "50px" }} onChange={(e) => { setRating(e.target.value) }}></input>
                    <p className="RegErro">{ratingErro}</p>
                    <br />
                    <br />
                    <button style={{ width: "5%", height: "40px", fontSize: "16px" }} onClick={reviewEditar} className="mainButton">Editar</button>
                </div>
                <Footer />
            </div>
        )
    }
}

export default EditarReview