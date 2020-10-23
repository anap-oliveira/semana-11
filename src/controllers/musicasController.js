const musicas = require("../models/musicas.json")
const fs = require("fs")
const { restart } = require("nodemon")

const getAllMusicas = (req, res) => {
    console.log(req.url)
    res.status(200).send(musicas)
}

const createMusicas = (req, res) => {
    const {id, title, duration, launchYear, favorited, artists} = req.body
    musicas.push({id, title, duration, launchYear, favorited, artists})
    fs.writeFile("./src/models/musicas.json", JSON.stringify(musicas), 'utf8', function (err) {
        if (err) {
            res.status(500).send({ message: err})
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const musicaFound = musicas.find(musica => musica.id == id)
            res.status(200).send(musicaFound)
        }
    })
}

const getMusicas = (req, res) => {
    const musicaId = req.params.id
    const musicaFound = musicas.find((musica) => musica.id == musicaId)
    if (musicaFound) {
        res.status(200).send(musicaFound)
    } else {
        res.status(404).send({ message: "Musica não encontrada"})
    }
}

const updateMusica = (req, res) => {
    try {
        const musicaID = req.params.id
        const musicaToUpdate = req.body

        const musicaFound = musica.find(musica => musica.id == musicaId)
        const musicaIndex = musicas.indexOf(musicaFound)

        if (musicaIndex >= 0) {
            musicas.splice(musicaIndex, 1, musicaToUpdate)
        } else {
            res.status(404).send({ message: "Musica não encotrada para ser atualizada."})
        }
        fs.writeFile("./src/models/musicas.json", JSON.stringify(musicas), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err})
            } else {
                console.log("Arquivo de musicas atualizado com sucesso!")
                const musicaUpdated = musica.find(musica => musica.id == musicaId)
                restart.status(200).send(musicaUpdated)
            }
    })
} catch (err) {
    res.status(500).send({ message: err})
}
}

const updateFavoritedStatus = (req, res) => {
    try {
        const musicaId = req.params.id
        const favorited = req.body.favorited

        const musicaToUpdate = musica.find(musica => musica.id == musicaId)
        const musicaIndex = musicas.indexOf(musicaToUpdate)

        if (musicaIndex >= 0) {
            musicaToUpdate.favorited = favorited
            musicas.splice(musicaIndex, 1, musicaToUpdate)
        } else {
            res.status(404).send({ message: "Musica favorita nao encontrada"})
        }
        fs.writeFile("./src/models/musicas.json", JSON.stringify(movies), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err})
            } else {
                console.log("Arquivo atualizado com sucesso!")
                const musicaUpdated = musicas.find((musica) => musica.id == musicaId)
                res.status(200).send(musicaUpdated)
            }
    })
} catch (err) {
    res.status(500).send({ message: err })
}
}

const deleteMusica = (req, res) => {
    try {
        const musicaId = req.params.id
        const musicaFound = musicas.find(musica => musica.id == musicaId)
        const musicaIndex = musicas.indexOf(musicaFound)

        if (musicaIndex >= 0) {
            musicas.splice(musicaIndex, 1)
        } else {
            res.status(404).send({ message: "Musica nao encontrada para ser deletada"})
        }

        fs.writeFile("./src/models/musicas.json", JSON.stringify(movies), 'utf8', function (err) {
            if (err) {
                res.status(500).send ({message: err})
            } else {
                console.log("Musica deletada com sucesso do arquivo")
                res.sendStatus(204)
            }
    })
} catch (err) {
    console.log(err)
    res.status(500).send({ message: "Erro ao deletar a musica"})
}
}

module.exports = {
    getAllMusicas,
    createMusicas,
    getMusicas,
    updateMusica,
    updateFavoritedStatus,
    deleteMusica
}