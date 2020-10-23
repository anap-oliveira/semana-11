const express = require("express")
const router = express.Router()
const controller = require("../controllers/musicasController")


router.get("/", controller.getAllMusicas) // retorna todas as minhas musicas

router.post("/", controller.createMusicas) // cria uma nova musica na lista

router.get("/:id", controller.getMusicas) // busca uma musica pelo ID

router.put("/:id", controller.updateMusica) // alterar uma musica existente na listagem

router.patch("/:id/favorited", controller.updateFavoritedStatus) // verificar musica favorita

router.delete("/:id", controller.deleteMusica) // deletar musica

module.exports = router;