import React from "react"
//Criação e personalização do rodapé da app
const Footer = () => {
    return (
        <div style={{
            position:"fixed", bottom: "0", backgroundColor: "white", width: "100%", borderTop: "1px solid #dee2e6", height: "6%"
        }}>
            <div style={{display:"flex", marginTop: "0.7%", marginLeft: '16%'}}>
                <p>© 2022 - AsMinhasReviews |</p>
                <a style={{marginLeft:"5px"}} href="https://github.com/aluno23032/AsMinhasReviewsReact">Repositório no Github</a>
            </div>
        </div>
    )
}

export default Footer