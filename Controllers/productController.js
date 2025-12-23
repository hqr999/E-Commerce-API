const Product = require(`../models/Product`);
const { StatusCodes } = require(`http-status-codes`);
const CustomError = require(`../errors`);

const criaProduto = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json();
};
const pegaTodosProduto = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};
const pegaUnicoProduto = async (req, res) => {
  const { id: product_id } = req.params;

  const produc = await Product.find({ _id: product_id });

  if (!produc) {
    throw new CustomError.NotFoundError(`Nenhum produto com id: ${product_id}`);
  }

  res.status(StatusCodes.OK).json({ produc });
};
const atualizaProduto = async (req, res) => {
  const { id: product_id } = req.params;

  const produc = await Product.findOneAndUpdate({ _id: product_id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!produc) {
    throw new CustomError.NotFoundError(`Nenhum produto com id: ${product_id}`);
  }

  res.status(StatusCodes.OK).json({ produc });
};

const deletaProduto = async (req, res) => {
  const { id: product_id } = req.params;
  const produc = await Product.findOne({ _id: product_id });

  if (!produc) {
    throw new CustomError.NotFoundError(
      `Nenhum producto com id: ${product_id}`,
    );
  }
  await produc.remove();
  res.status(StatusCodes.OK).json({ msg: `Sucesso! Produto Removido` });
};

const updateProduto = async (req, res) => {
  res.send(`Upload produto`);
};

module.exports = {
  criaProduto,
  pegaUnicoProduto,
  pegaUnicoProduto,
  atualizaProduto,
  deletaProduto,
  updateProduto,
  pegaTodosProduto,
};
