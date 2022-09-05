import Wallet from "../../models/WalletModel";
class CreateWalletController {
  constructor() {}
  async create(id) {
    try {
      await Wallet.create({ user_id: id });
      return;
    } catch (error) {
      return error.message;
    }
  }
}

export default new CreateWalletController();
