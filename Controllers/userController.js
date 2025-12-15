const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const pegaTodosUsuarios = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const pegaUnicoUsuario = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const mostraUsuarioAtual = async (req, res) => {
  res.send("Mostrar usuário atual");
};

const atualizaUsuario = async (req, res) => {
  res.send(req.body);
};

const atualizaSenha = async (req, res) => {
  res.send("Atualiza senha atual");
};

module.exports = {
  pegaTodosUsuarios,
  pegaUnicoUsuario,
  mostraUsuarioAtual,
  atualizaUsuario,
  atualizaSenha,
};
