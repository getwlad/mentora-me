import axios from "axios";
import Wallet from "../../../models/WalletModel";
class AddBalanceController {
  async add(req, res) {
    try {
      const userId = req.user;
      const wallet = await Wallet.findOne({
        where: {
          user_id: userId,
        },
      });
      const { number, holderName, expMonth, expYear, cvv, amount } = req.body;
      let walletBalance = parseFloat(wallet.balance);
      const data = {
        customer: {
          name: holderName,
          email: "avengerstark@ligadajustica.com.br",
          type: "individual",
        },
        items: [
          {
            amount,
            description: "Créditos Mentora-me",
            quantity: 1,
            code: 123,
          },
        ],
        payments: [
          {
            credit_card: {
              card: {
                number,
                holder_name: holderName,
                exp_month: expMonth,
                exp_year: expYear,
                cvv,
              },
              installments: 1,
              statement_descriptor: "MENTORA",
            },
            payment_method: "credit_card",
          },
        ],
      };
      const auth = {
        auth: {
          username: process.env.KEY_SECRET,
          password: "",
        },
      };
      const { data: resp } = await axios.post(
        "https://api.pagar.me/core/v5/orders",
        data,
        auth
      );
      if (resp.status === "paid") {
        walletBalance += amount;
        await wallet.update({
          balance: walletBalance,
        });
        return res.status(200).json({
          sucess: "Créditos adicionados com sucesso",
          saldo: wallet.balance,
        });
      } else {
        return res.status(400).json({ error: "Pagamento não autorizado" });
      }
    } catch (err) {
      return res.status(400).json({ error: err.response.data });
    }
  }
}

export default new AddBalanceController();
