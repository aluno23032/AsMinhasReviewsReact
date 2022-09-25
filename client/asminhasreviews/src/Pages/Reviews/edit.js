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
    const [idUser, setIdUser] = useState()
    const [idJogo, setIdJogo] = useState()
    const [nomeCriador, setNomeCriador] = useState()
    
    const navigate = useNavigate()

    const reviewEditar = () => {
        setConteudoErro("")
        //Verificação do conteúdo da review
        if (conteudo.length < 1) {
            setConteudoErro("Introduza a descrição do jogo")
        } else
            if (rating < 0 || rating > 10 || rating === undefined) {
                setRatingErro("Introduza um valor válido")
            } else {
                //Editar a review
                Axios.post("http://localhost:3001/reviewEditar", {
                    idReview: idReview, conteudo: conteudo, rating: rating
                }).then((response) => {
                    console.log(response);
                    //Se a edição for válida, mudar para a página com as reviews do utilizador
                    if (response.data.editado == "true") {
                        Axios.post("http://localhost:3001/atualizarRating", {
                            jogoId: idJogo
                        })
                        navigate("/Utilizadores/" + idUser);
                    }
                })
            }
    }

    useEffect(() => {
        //Buscar informação da review
        Axios.get("http://localhost:3001/getReview", {
            params: { idReview }
        }).then((response) => {
            setConteudo(response.data[0].Conteudo);
            setRating(response.data[0].Rating);
            setIdJogo(response.data[0].Jogo)
            setNomeCriador(response.data[0].CriadorNome)
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
            setIdUser(response.data.user[0].Id)
        })
    }, [])

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

export default EditarReview