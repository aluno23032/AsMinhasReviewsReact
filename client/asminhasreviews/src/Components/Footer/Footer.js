import React from "react"

const Footer = () => {
    return (
        <div style={{
            marginLeft: '16%', verticalAlign: "middle", position: "absolute",
            bottom: "0px",
        }}>
            <div style={{display:"flex"}}>
                <p>© 2022 - AsMinhasReviews |</p>
                <a style={{marginLeft:"5px"}} href="https://github.com/aluno23032/AsMinhasReviewsReact">Repositório no Github</a>
            </div>
        </div>
    )
}

export default Footer