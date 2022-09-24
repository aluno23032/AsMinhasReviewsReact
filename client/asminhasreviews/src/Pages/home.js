import React from "react"
import Navbar from "./../Components/Navbar/Navbar.js"
import Footer from "./../Components/Footer/Footer.js"
//Pagina inical e a sua personalização
const Home = () => {
    return (
        <div>
            <Navbar/>
            <div style={{marginTop:"300px"}}>
                <h1 style={{fontSize:"3.5rem", fontWeight:"300"}}>Bem-vindo</h1>
            </div>
            <div>
                <a href="Jogos/Index/Rating">Lista dos melhores jogos</a>
                <span> | </span>
                <a href="Reviews/Create">Criar uma review</a>
                <span> | </span>
                <a href="Detalhes">Detalhes da aplicação</a>
            </div>
            <Footer/>
        </div>
    )
}

export default Home