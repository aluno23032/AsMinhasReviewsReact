import React, { useEffect, useState } from "react"
import Navbar from './../../Components/Navbar/Navbar.js'
import Footer from "./../../Components/Footer/Footer.js"
import Axios from "axios"
import dateFormat from "dateformat"

const Index = () => {

    const [listaJogos, setListaJogos] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/listajogos").then((response) => {
            setListaJogos(response.data);
        });
    }, [])

    return (
        <div>
            <Navbar />
            <div style={{ marginTop: "100px" }}>
            </div>
            {listaJogos.map((val) => {
                return (
                    <div>
                        <h3>{val.Nome}</h3>
                        <h3>{val.Capa}</h3>
                        <h3>{val.Plataformas}</h3>
                        <h3>{val.Rating.toFixed(1)}</h3>
                        <h3>{dateFormat(val.DataLancamento, "yyyy-mm-dd")}</h3>
                        <h3>{val.Descricao}</h3>
                    </div>
                );
            })}
            <Footer />
        </div>
    );
}

export default Index