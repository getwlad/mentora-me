import * as yup from "yup";
import regex from "../libs/regexValidators";

async function studentValidator(request, response, next) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Seu nome é obrigatório.")
      .matches(regex.name, "Nome inválido."),
    cpf: yup
      .string()
      .required("Seu CPF é obrigatório.")
      .matches(regex.validCPF, "CPF inválido."),
    phone: yup
      .string()
      .required("Seu telefone é obrigatório.")
      .matches(regex.phoneNumber, "Telefone inválido."),
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

export default studentValidator;
