import User from "../../models/UserModel";

class UpdateUserController {
  async update(req, res) {
    try {
      const id = req.user;
      const { email } = req.body;
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password_hash"] },
      });
      if (email) {
        if (user.email != email) {
          const userEmail = await User.findOne({
            where: { email: email },
            attributes: { exclude: ["password_hash"] },
          });

          if (userEmail) {
            return res.status(400).json({ erro: "email já cadastrado" });
          }
        }
      }

      if (!user) {
        return res.status(404).json({ Error: "Usuário não encontrado" });
      }

      const { user_type, createdAt, updatedAt } = await user.update(req.body);
      return res
        .status(200)
        .json({ id, email, user_type, createdAt, updatedAt });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new UpdateUserController();
