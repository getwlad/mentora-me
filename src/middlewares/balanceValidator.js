import * as yup from "yup";
import regex from "../libs/regexValidators";

async function balanceValidator(request, response, next) {
  const schema = yup.object().shape({
    holderName: yup.string().required("Nome obrigatório."),
    amount: yup.number().required(),
    number: yup
      .string()
      .required()
      .matches(regex.validCreditCard, "Número do cartão de crédito inválido"),
    expMonth: yup.string().required().matches(regex.validMonth, "Mês inválido"),
    expYear: yup.string().required(),
    cvv: yup.string().required().matches(regex.validCvv, "CVV inválido"),
  });

  await schema
    .validate(request.body)
    .then(() => next())
    .catch((err) => {
      return response.status(400).json({
        error: err.errors,
      });
    });
}

export default balanceValidator;
