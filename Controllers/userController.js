const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

const pegaTodosUsuarios = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const pegaUnicoUsuario = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const mostraUsuarioAtual = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

//atualizaUsuario com save()
const atualizaUsuario = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequestError("Por favor dê todos os valores");
  }

  user.email = email;
  user.name = name;

  await user.save();

  const user = await User.findOneAndUpdate({ _id: req.user.userId });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const atualizaSenha = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Por favor dê os dois valores");
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Credenciais inválidas");
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Sucesso! Senha mudada" });
};

module.exports = {
  pegaTodosUsuarios,
  pegaUnicoUsuario,
  mostraUsuarioAtual,
  atualizaUsuario,
  atualizaSenha,
};

//atualizaUsuario com findOneAndUpdate
/* const atualizaUsuario = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequestError("Por favor dê todos os valores");
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    { new: true, runValidators: true }
  );
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
}; */
