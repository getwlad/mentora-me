import User from "../../models/UserModel";
class ShowUserController {
  async show(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password_hash"] },
      });
      if (!user) {
        return res.status(404).json({ Error: "Usuário não encontrado" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ShowUserController();
