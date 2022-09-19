import User from "../../models/UserModel";
class ShowUserController {
  async show(req, res) {
    try {
      const id = req.user;
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password_hash"] },
      });

      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Acesso não autorizado: login necessário." });
    }
  }
}

export default new ShowUserController();
