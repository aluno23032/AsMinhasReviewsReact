import React, { useState } from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer.js"
import Axios from "axios"
import { useNavigate } from "react-router-dom";

const CriarJogo = () => {

    const [nome, setNome] = useState("")
    const [capa, setCapa] = useState("")
    const [plataformas, setPlataformas] = useState("")
    const [dataLancamento, setDataLancamento] = useState("")
    const [descricao, setDescricao] = useState("")
    const navigate = useNavigate();

    const jogoCriar = () => {
        Axios.post("http://localhost:3001/jogoCriar", {
            nome: nome, capa: capa, plataformas: plataformas, dataLancamento: dataLancamento, descricao: descricao
        }).then((response) => {
            console.log(response);
            if (response.data.registado == "true") {
                navigate("/Jogos/Index/Rating");
            }
        })
    }

return (
    <div>
        <Navbar />
        <div style={{ marginTop: "10px", float: "left", marginLeft: "16%", textAlign: "left", width: "1300px" }}>
            <h1>Criar jogo</h1>
            <hr />
            <p className="RegText">Nome</p>
            <input className="input" type="text" style={{height:"40px"}} onChange={(e) => { setNome(e.target.value) }}></input>
            <br />
            <p className="RegText">Capa</p>
            <input className="input" type="text" style={{height:"40px"}} onChange={(e) => { setCapa(e.target.value) }}></input>
            <br />
            <p className="RegText">Plataformas</p>
            <input className="input" type="text" style={{height:"40px"}} onChange={(e) => { setPlataformas(e.target.value) }}></input>
            <br />
            <p className="RegText">Data de Lancamento</p>
            <input className="input" type="date" style={{height:"40px"}} onChange={(e) => { setDataLancamento(e.target.value) }}></input>
            <p className="RegText">Descrição</p>
            <textarea className="input" type="text" style={{height:"150px"}} onChange={(e) => { setDescricao(e.target.value) }}></textarea>
            <br />
            <br />
            <button onClick={jogoCriar} className="mainButton">Criar</button>
        </div>
        <Footer />
    </div>
)}

export default CriarJogo