import Wallet from "../../../models/WalletModel";

class ListBalanceController {
  async list(req, res) {
    try {
      const userId = req.user;
      const wallet = await Wallet.findOne({
        where: {
          user_id: userId,
        },
      });
      const walletBalance = parseFloat(wallet.balance);
      return res.status(200).json({ saldo: walletBalance });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new ListBalanceController();
