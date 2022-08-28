import User from "../../models/UserModel";
class CreateUserService {
  async createUser(email, password, user_type) {
    const chkMail = await User.findOne({ where: { email } });
    if (chkMail) {
      return;
    }
    const { id } = await User.create({ email, password, user_type });

    return { id, email };
  }
}

export default new CreateUserService();
