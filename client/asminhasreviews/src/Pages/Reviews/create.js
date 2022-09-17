import React, { useEffect, useState } from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer.js"
import Axios from "axios"
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat"

const CriarReview = () => {

    const [conteudo, setConteudo] = useState("")
    const [rating, setRating] = useState()
    const [jogoId, setJogoId] = useState()
    const [conteudoErro, setConteudoErro] = useState("")
    const [ratingErro, setRatingErro] = useState("")
    const [role, setRole] = useState("")
    const [idUser, setIdUser] = useState("")
    const [listaJogos, setListaJogos] = useState([]);
    const navigate = useNavigate()

    const reviewCriar = () => {
        setConteudoErro("")
        if (conteudo.length < 1) {
            setConteudoErro("Introduza a descrição do jogo")
        } else
            if (rating < 0 || rating > 10 || rating === undefined) {
                setRatingErro("Introduza um valor válido")
            } else {
                Axios.post("http://localhost:3001/reviewCriar", {
                    conteudo: conteudo, dataCriacao: dateFormat(new Date(), "yy-mm-dd"), rating: rating, jogoId: jogoId, criador: idUser
                }).then((response) => {
                    console.log(response);
                    if (response.data.criado == "true") {
                        Axios.post("http://localhost:3001/atualizarRating", {
                            jogoId: jogoId
                        })
                        navigate("/Utilizadores/" + idUser);
                    }
                })
            }
    }

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
        let ordem = "Nome"
        Axios.get("http://localhost:3001/listajogos", {
            params: { ordem }
        }).then((response) => {
            setListaJogos(response.data);
        });
    }, [])

    return (
        <div>
            <Navbar />
            <div style={{ marginTop: "10px", float: "left", marginLeft: "16%", textAlign: "left", width: "1300px" }}>
                <h1>Criar review</h1>
                <hr />
                <p className="RegText">Conteúdo</p>
                <textarea className="input" type="text" style={{ height: "150px" }} onChange={(e) => { setConteudo(e.target.value) }}></textarea>
                <p className="RegErro">{conteudoErro}</p>
                <br />
                <p className="RegText">Rating</p>
                <input className="input" type="number" style={{ height: "50px" }} onChange={(e) => { setRating(e.target.value) }}></input>
                <p className="RegErro">{ratingErro}</p>
                <br />
                <p className="RegText">Jogo</p>
                <select className="input" value={jogoId} onChange={(e) => setJogoId(e.target.value)}>
                    {listaJogos.map((val, key) => {
                        return (
                            <option value={val.Id}>{val.Nome}</option>
                        )
                    })}
                </select>
                <br />
                <br />
                <button style={{ width: "5%", height: "40px", fontSize: "16px" }} onClick={reviewCriar} className="mainButton">Criar</button>
            </div>
            <Footer />
        </div>
    )
}

export default CriarReview