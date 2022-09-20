import User from "../../models/UserModel";
class DeleteUserController {
  async delete(req, res) {
    const id = req.user;
    const user = await User.findByPk(id);
    await user.destroy();
    return res.status(200).json({ msg: "Usuário deletado com sucesso!" });
  }
}

export default new DeleteUserController();
