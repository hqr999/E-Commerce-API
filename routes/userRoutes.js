const express = require("express");
const router = express.Router();


const {
  pegaTodosUsuarios,
  pegaUnicoUsuario,
  mostraUsuarioAtual,
  atualizaUsuario,
  atualizaSenha,
} = require("../Controllers/userController");
const { authenticateUser } = require("../middleware/authentication");

router.route("/").get(authenticateUser,pegaTodosUsuarios);

router.route("/showMe").get(mostraUsuarioAtual);
router.route("/updateUser").patch(atualizaUsuario);
router.route("/updateUserPassword").post(atualizaSenha);

router.route("/:id").get(authenticateUser,pegaUnicoUsuario);

module.exports = router;