const express = require("express");
const router = express.Router();

const {
  pegaTodosUsuarios,
  pegaUnicoUsuario,
  mostraUsuarioAtual,
  atualizaUsuario,
  atualizaSenha,
} = require("../Controllers/userController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router.route("/").get(authenticateUser,authorizePermissions('admin','owner'),pegaTodosUsuarios);

router.route("/showMe").get(authenticateUser,mostraUsuarioAtual);
router.route("/updateUser").patch(authenticateUser,atualizaUsuario);
router.route("/updateUserPassword").patch(authenticateUser,atualizaSenha);

router.route("/:id").get(authenticateUser, pegaUnicoUsuario);

module.exports = router;
