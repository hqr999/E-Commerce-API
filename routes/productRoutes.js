const express = require(`express`);
const router = express.Router();
const { authenticateUser, authorizePermissions } = require(
  `../middleware/authentication`,
);
const {
  criaProduto,
  pegaUnicoProduto,
  pegaTodosProduto,
  deletaProduto,
  atualizaProduto,
  uploadImagem,
} = require("../Controllers/productController");

router
  .route(`/`)
  .post([authenticateUser, authorizePermissions(`admin`)], criaProduto)
  .get(pegaTodosProduto);

router
  .route(`/uploadImage`)
  .post([authenticateUser, authorizePermissions(`admin`)], uploadImagem);

router
  .route(`/:id`)
  .get(pegaUnicoProduto)
  .patch([authenticateUser, authorizePermissions(`admin`)], atualizaProduto)
  .delete([authenticateUser, authorizePermissions(`admin`)], deletaProduto);

module.exports = router;
