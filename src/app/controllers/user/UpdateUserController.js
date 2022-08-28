import User from "../../models/UserModel";
import UpdateStudentService from "../../services/student/UpdateStudentService";
class UpdateUserController {
  async update(req, res) {
    const id = req.params.id;
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
      res.status(404).json({ Error: "Usuário não encontrado" });
    }

    const { user_type, createdAt, updatedAt } = await user.update(req.body);
    return res.status(200).json({ id, email, user_type, createdAt, updatedAt });
  }
}

export default new UpdateUserController();
