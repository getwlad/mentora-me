import User from "../../models/UserModel";
class DeleteUserController {
  async delete(req, res) {
    const id = req.params.id;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ Error: "Usuário não encontrado" });
    }
    await user.destroy();
    return res.status(200).json({ msg: "sucesso" });
  }
}

export default new DeleteUserController();
