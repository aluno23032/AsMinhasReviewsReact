import React from "react"
import Navbar from "./../Components/Navbar/Navbar.js"
import Footer from "./../Components/Footer/Footer.js"

const Home = () => {
    return (
        <div>
            <Navbar/>
            <div style={{marginTop:"80px"}}>
                <h1>Licenciatura em Engenharia Informática</h1>
                <h2>Desenvolvimento Web - 2º Ano</h2>
            </div>
            <div>
                <br/>
                <span>Aplicação criada por:</span><br/>
                <span>Eduardo Gomes - N.º 23032</span>
                <p>Jorge Lavado - N.º 23037</p>
                <span>Bibliotecas e frameworks utilizadas:</span><br/>
                <span>Axios</span><br/>
                <span>Bcrypt</span><br/>
                <span>Body-parser</span><br/>
                <span>Bootstrap</span><br/>
                <span>Cookie-parser</span><br/>
                <span>Cors</span><br/>
                <span>Dateformat</span><br/>
                <span>Express, Express-fileupload e Express-session</span><br/>
                <span>Mysql</span><br/>
                <p>React</p>
                <span>Conta administrador: admin123</span>
                <p>Password: admin123</p>
                <span>Conta utilizador: josesilva</span>
                <p>Password: josesilva123</p>
            </div>
            <Footer/>
        </div>
    )
}

export default Home