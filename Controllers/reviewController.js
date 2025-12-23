const criaReview = async (req, res) => {
  res.send("cria review");
};

const pegaTodasReviews = async (req, res) => {
  res.send("pega todas as reviews");
};

const pegaUnicaReview = async (req, res) => {
  res.send("cria review");
};

const atualizaReview = async (req, res) => {
  res.send("atualiza review");
};

const deletaReview = async (req, res) => {
  res.send("deleta review");
};

module.exports = {
  criaReview,
  pegaTodasReviews,
  pegaUnicaReview,
  atualizaReview,
  deletaReview,
};
