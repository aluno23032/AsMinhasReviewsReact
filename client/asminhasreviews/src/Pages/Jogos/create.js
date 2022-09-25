import React, { useEffect, useState } from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer.js"
import Axios from "axios"
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat"

//Formulário de criação de um jogo
const CriarJogo = () => {

    const [nome, setNome] = useState("")
    const [nomeErro, setNomeErro] = useState("")
    const [capa, setCapa] = useState("")
    const [capaErro, setCapaErro] = useState("")
    const [capaFicheiro, setCapaFicheiro] = useState(null)
    const [plataformas, setPlataformas] = useState("")
    const [plataformasErro, setPlataformasErro] = useState("")
    const [dataLancamento, setDataLancamento] = useState(new Date())
    const [descricao, setDescricao] = useState("")
    const [descricaoErro, setDescricaoErro] = useState("")
    const [fotos, setFotos] = useState([])
    const [fotosErro, setFotosErro] = useState("")
    const [role, setRole] = useState("")
    const navigate = useNavigate()

    const jogoCriar = () => {
        setNomeErro("")
        setCapaErro("")
        setPlataformasErro("")
        setDescricaoErro("")
        setFotosErro("")
        //Verificação das características do jogo
        if (nome.length < 1) {
            setNomeErro("Introduza o nome do jogo")
        } else
            if (capa.length < 1) {
                setCapaErro("Introduza a capa do jogo")
            } else
                if (plataformas.length < 1) {
                    setPlataformasErro("Introduza as plataformas do jogo")
                } else
                    if (descricao.length < 1) {
                        setDescricaoErro("Introduza a descrição do jogo")
                    } else
                        if (fotos.length < 1) {
                            setFotosErro("Introduza as fotografias do jogo")
                        } else {
                            //Se forem válidas, criar um formulário com a informação do jogo
                            const formData = new FormData()
                            formData.append('capaFicheiro', capaFicheiro)
                            formData.append('nome', nome)
                            formData.append('capa', capa)
                            formData.append('plataformas', plataformas)
                            formData.append('dataLancamento', dateFormat(dataLancamento, "yy-mm-dd"))
                            formData.append('descricao', descricao)
                            formData.append('fotosLength', fotos.length)
                            for (let i = 0; i < fotos.length; i++) {
                                formData.append("fotos", fotos[i])
                            }
                            //Enviar o formulário para o jogo poder ser criado
                            Axios.post("http://localhost:3001/jogoCriar", formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                },
                            }).then((response) => {
                                console.log(response);
                                //Se a criação for válida, mudar para a página com os jogos mais recentes
                                if (response.data.criado == "true") {
                                    navigate("/Jogos/Index/DataLancamento");
                                }
                            })
                        }
    }

    //Verificar "role" do utilizador
    useEffect(() => {
        //Se o utilizador não for administrador, mudar para a página com os jogos mais recentes
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.user[0].RoleId == "a") {
                setRole("a")
            } else {
                navigate("/Jogos/Index/DataLancamento")
            }
        })
    }, [])

    //Upload das fotografias do jogo
    const uploadFotos = event => {
        console.log(event.target.files)
        setFotos(event.target.files)
    }

    //Upload da capa do jogo
    const uploadImagem = event => {
        console.log(event.target.files[0])
        setCapa(event.target.files[0].type.replace("image/", "").replace("jpeg", "jpg"))
        setCapaFicheiro(event.target.files[0])
    }

    return (
        <div>
            <Navbar />
            <div style={{ marginTop: "10px", float: "left", marginLeft: "16%", textAlign: "left", width: "1300px" }}>
                <h1>Criar jogo</h1>
                <hr />
                <p className="RegText">Nome</p>
                <input className="input" type="text" style={{ height: "40px" }} onChange={(e) => { setNome(e.target.value) }}></input>
                <p className="RegErro">{nomeErro}</p>
                <p className="RegText">Capa</p>
                <input type="file" style={{ height: "40px" }} onChange={(e) => { uploadImagem(e) }}></input>
                <p className="RegErro">{capaErro}</p>
                <p className="RegText">Plataformas</p>
                <input className="input" type="text" style={{ height: "40px" }} onChange={(e) => { setPlataformas(e.target.value) }}></input>
                <p className="RegErro">{plataformasErro}</p>
                <p className="RegText">Data de Lancamento</p>
                <input className="input" type="date" style={{ height: "40px" }} onChange={(e) => { setDataLancamento(e.target.value) }}></input>
                <br></br>
                <p className="RegText">Descrição</p>
                <textarea className="input" type="text" style={{ height: "150px" }} onChange={(e) => { setDescricao(e.target.value) }}></textarea>
                <p className="RegErro">{descricaoErro}</p>
                <p className="RegText">Fotos</p>
                <input type="file" multiple style={{ height: "40px" }} onChange={(e) => { uploadFotos(e) }}></input>
                <p className="RegErro">{fotosErro}</p>
                <br />
                <button style={{ width: "5%", height: "40px", fontSize: "16px" }} onClick={jogoCriar} className="mainButton">Criar</button>
            </div>
            <Footer />
        </div>
    )
}

export default CriarJogo