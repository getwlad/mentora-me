import CreateUserService from "../../services/user/CreateUserService";
import CreateWalletController from "../wallet/CreateWalletController";
class CreateUserController {
  constructor() {}
  async create(req, res) {
    const { email, password, user_type } = req.body;
    if (!user_type) {
      return res.status(400).json({ error: "forneça um tipo de usuario" });
    }

    const user = await CreateUserService.createUser(email, password, user_type);

    if (!user) {
      return res.status(401).json({ error: "Email já cadastrado" });
    }

    const { id } = user;
    await CreateWalletController.create(id);

    return res.status(200).json(user);
  }
}

export default new CreateUserController();
