import User from "../../models/UserModel";
class DeleteUserController {
  async delete(req, res) {
    try {
      const id = req.params.id;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ Error: "Usuário não encontrado" });
      }
      await user.destroy();
      return res.status(200).json({ msg: "sucesso" });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new DeleteUserController();
