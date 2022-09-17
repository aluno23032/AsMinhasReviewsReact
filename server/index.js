const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const fileUpload = require('express-fileupload');
fs = require('fs');
fs = require('fs');

const saltRounds = 10;

const app = express();
app.use(fileUpload());
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    key: "userId",
    secret: "topsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 60 * 24
    }
}))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "reviews"
})

app.post("/register", (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query("SELECT * FROM Utilizadores WHERE Nome = ?;", username, (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.length > 0) {
                res.send({ message1: "Esse nome de utilizador não está disponível.", message2: "" })
            } else {
                db.query("SELECT * FROM Utilizadores WHERE Email = ?;", email, (err, result) => {
                    if (result.length > 0) {
                        res.send({ message2: "Esse email não está disponível.", message1: "" })
                    }
                    else {
                        db.query("INSERT INTO Utilizadores (Nome, Email, Password) VALUES (?,?,?)", [username, email, hash], (err, result) => {
                            if (err) {
                                console.log(err)
                            }
                            res.send({ message1: "", message2: "", registado: "true" })
                        })
                    }
                })
            }
        })
    })
})

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ auth: true, user: req.session.user })
    } else {
        res.send({ auth: false, user: "n" })
    }
})

app.get("/getUsername", (req, res) => {
    idUser = req.query.idCriador
    db.query("SELECT Nome FROM Utilizadores WHERE Id = ?;", idUser, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post("/logout", (req, res) => {
    res.send({ auth: false })
    req.session.destroy();
})

app.post("/details", (req, res) => {
    const username = req.body.username
    const usernameNovo = req.body.usernameNovo
    db.query("UPDATE Utilizadores SET Nome = ? WHERE Nome = ?;", [usernameNovo, username], (err, result) => {
        if (err) {
            console.log(err)
            res.send({ erro: "Ocorreu um erro.", confirm: "" })
        } else {
            req.session.user[0].Nome = usernameNovo
            res.send({ erro: "", confirm: "Nome de utilizador alterado com sucesso." })
        }
    })
})

app.post("/changeEmail", (req, res) => {
    const email = req.body.email
    const emailNovo = req.body.emailNovo
    db.query("UPDATE Utilizadores SET Email = ? WHERE Email = ?;", [emailNovo, email], (err, result) => {
        if (err) {
            console.log(err)
            res.send({ erro: "Ocorreu um erro.", confirm: "" })
        } else {
            res.send({ erro: "", confirm: "Email alterado com sucesso." })
        }
    })
})

app.post("/changePassword", (req, res) => {
    const password = req.body.password
    bcrypt.hash(password, saltRounds, (hash) => {
        db.query("UPDATE Utilizadores SET Password = ? WHERE Nome = ?;", [hash, req.session.user[0].Nome], (err, result) => {
            if (err) {
                console.log(err)
                res.send({ erro: "Ocorreu um erro.", confirm: "" })
            } else {
                res.send({ erro: "", confirm: "Palavra-passe alterada com sucesso." })
            }
        })
    })
})

app.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    db.query("SELECT * FROM Utilizadores INNER JOIN userroles ON Utilizadores.Id = userroles.UserId WHERE Nome = ?", username, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].Password, (err, response) => {
                if (response) {
                    req.session.user = result
                    res.send({ auth: true, result: result, message1: "", message2: "" })
                } else {
                    res.send({ auth: false, message1: "Password incorreta.", message2: "" })
                }
            })
        } else {
            res.send({ auth: false, message2: "O utilizador não existe.", message1: "" })
        }
    })
}
)

app.get("/getJogo", (req, res) => {
    const idJogo = req.query.idJogo
    db.query("SELECT * FROM jogos WHERE Id = ?", idJogo, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/getReview", (req, res) => {
    const idReview = req.query.idReview
    db.query("SELECT *, (SELECT Nome FROM utilizadores WHERE Id = reviews.Criador) as CriadorNome, (SELECT Nome FROM jogos WHERE Id = reviews.Jogo) as JogoNome FROM reviews WHERE Id = ?", 
    idReview, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/getReviewsJogo", (req, res) => {
    const idJogo = req.query.idJogo
    db.query("SELECT *, (SELECT Nome FROM utilizadores WHERE Id = reviews.Criador) as CriadorNome FROM reviews WHERE Jogo = ?", idJogo, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/getReviewsUser", (req, res) => {
    const idUser = req.query.idCriador
    db.query("SELECT *, (SELECT Nome FROM jogos WHERE Id = reviews.Jogo) as JogoNome FROM reviews WHERE Criador = ?", idUser, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/listajogos", (req, res) => {
    const ordem = req.query.ordem
    if (ordem == "Rating") {
        db.query("SELECT * FROM jogos ORDER BY Rating DESC", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    } else if (ordem === "Nome") {
        db.query("SELECT * FROM jogos ORDER BY Nome ASC", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    }
    else {
        db.query("SELECT * FROM jogos ORDER BY DataLancamento DESC", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    }
});

app.post("/removerJogo", (req, res) => {
    const idJogo = req.body.idJogo
    const capa = req.body.capa
    const nomeFormatado = req.body.nomeFormatado
    const fotosLength = req.body.fotosLength
    fs.unlink("./../client/asminhasreviews/public/Fotos/" + capa, function (err) {
        if (err) {
            throw err
        }
    })
    let i = 0
    while (i < fotosLength) {
        fs.unlink("./../client/asminhasreviews/public/Fotos/" + nomeFormatado + (i + 1) + ".png", function (err) {
            if (err) {
                throw err
            }
        })
        i++
    }
    db.query("DELETE FROM Jogos WHERE Id = ?", idJogo, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send({ apagado: "true" })
    })
});

app.post("/jogoEditar", (req, res) => {
    const idJogo = req.body.idJogo
    const oldCapa = req.body.oldCapa
    const oldNomeFormatado = req.body.oldNomeFormatado
    const oldFotosLength = req.body.oldFotosLength
    let j = 0
    while (j < oldFotosLength) {
        fs.unlink("./../client/asminhasreviews/public/Fotos/" + oldNomeFormatado + (j + 1) + ".png", function (err) {
            if (err) {
                throw err
            } else {
                console.log("File deleted")
            }
        })
        j++
    }
    fs.unlink("./../client/asminhasreviews/public/Fotos/" + oldCapa, function (err) {
        if (err) {
            throw err
        }
    })
    const nome = req.body.nome
    const nomeFormatado = req.body.nome.toLowerCase().replace(/\s/g, '')
    const capa = nomeFormatado + "." + req.body.capa
    const plataformas = req.body.plataformas
    const dataLancamento = req.body.dataLancamento
    const descricao = req.body.descricao
    const file = req.files.capaFicheiro
    const fotos = req.files.fotos
    const fotosLength = req.body.fotosLength
    if (fotosLength == 1) {
        fotos.mv("./../client/asminhasreviews/public/Fotos/" + nomeFormatado + 1 + ".png", err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
        });
    } else {
        let i = 0
        while (i < fotosLength) {
            fotos[i].mv("./../client/asminhasreviews/public/Fotos/" + nomeFormatado + (i + 1) + ".png", err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
            });
            i++
        }
    }
    file.mv("./../client/asminhasreviews/public/Fotos/" + capa, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    });
    db.query("UPDATE jogos SET Nome = ?, NomeFormatado = ?, Capa = ?, Plataformas = ?, DataLancamento = ?, Descricao = ?, NumeroImgs = ? WHERE Id = ?", [nome, nomeFormatado, capa, plataformas, dataLancamento, descricao, fotosLength, idJogo], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send({ editado: "true" })
    })
});

app.post("/removerJogo", (req, res) => {
    const idJogo = req.body.idJogo
    const capa = req.body.capa
    const nomeFormatado = req.body.nomeFormatado
    const fotosLength = req.body.fotosLength
    fs.unlink("./../client/asminhasreviews/public/Fotos/" + capa, function (err) {
        if (err) {
            throw err
        } else {
            console.log("Successfully deleted the file.")
        }
    })
    let i = 0
    while (i < fotosLength) {
        fs.unlink("./../client/asminhasreviews/public/Fotos/" + nomeFormatado + (i + 1) + ".png", function (err) {
            if (err) {
                throw err
            } else {
                console.log("Successfully deleted the file.")
            }
        })
        i++
    }
    db.query("DELETE FROM Jogos WHERE Id = ?", idJogo, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send({ apagado: "true" })
    })
});

app.post("/jogoCriar", (req, res) => {
    const nome = req.body.nome
    const nomeFormatado = req.body.nome.toLowerCase()
    const capa = nomeFormatado + "." + req.body.capa
    const plataformas = req.body.plataformas
    const dataLancamento = req.body.dataLancamento
    const descricao = req.body.descricao
    const file = req.files.capaFicheiro
    const fotos = req.files.fotos
    const fotosLength = req.body.fotosLength
    let i = 0
    while (i < fotosLength) {
        fotos[i].mv("./../client/asminhasreviews/public/Fotos/" + nomeFormatado + (i + 1) + ".png", err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
        });
        i++
    }
    file.mv("./../client/asminhasreviews/public/Fotos/" + capa, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    });
    db.query("INSERT INTO Jogos (Nome, NomeFormatado, Capa, Plataformas, Rating, DataLancamento, Descricao, NumeroImgs) VALUES (?,?,?,?,0,?,?,?)", [nome, nomeFormatado, capa, plataformas, dataLancamento, descricao, fotosLength], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send({ criado: "true" })
    })
});

app.post("/reviewCriar", (req, res) => {
    const conteudo = req.body.conteudo
    const dataCriacao = req.body.dataCriacao
    const rating = req.body.rating
    const jogoId = req.body.jogoId
    const criador = req.body.criador
    db.query("INSERT INTO reviews (DataCriacao, Conteudo, Rating, Criador, Jogo) VALUES (?,?,?,?,?)", [dataCriacao, conteudo, rating, jogoId, criador], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send({ criado: "true" })
    })
});

app.post("/reviewEditar", (req, res) => {
    const conteudo = req.body.conteudo
    const rating = req.body.rating
    const idReview = req.body.idReview
    db.query("UPDATE reviews SET Conteudo = ?, Rating = ? WHERE Id = ?", [conteudo, rating, idReview], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send({ editado: "true" })
    })
});

app.post("/atualizarRating", (req, res) => {
    const jogoId = req.body.jogoId
    db.query("UPDATE jogos SET Rating = (SELECT avg(rating) FROM reviews WHERE jogo = ?) WHERE Id = ?", [jogoId, jogoId], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send({ criado: "true" })
    })
});

app.listen(3001, () => {
    console.log("Servidor a correr")
})