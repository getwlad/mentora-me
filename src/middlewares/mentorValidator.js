import * as yup from "yup";
import regex from "../libs/regexValidators";

async function mentorValidator(request, response, next) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Seu nome é obrigatório.")
      .matches(regex.name, "Nome inválido"),
    email: yup
      .string()
      .email("Email inválido.")
      .required("Seu email é obrigatório."),
    password: yup
      .string()
      .required("Sua senha é obrigatória.")
      .min(8, "A senha deve ter um mínimo de 8 caracteres.")
      .matches(regex.password, "A senha deve conter letras e números."),
    CPF: yup
      .string()
      .required("Seu CPF é obrigatório")
      .matches(regex.validCPF, "CPF inválido"),
    publicEmail: yup
      .string()
      .email("Email inválido.")
      .required("Um email público é obrigatório."),
    phone: yup
      .string()
      .required("Seu telefone é obrigatório")
      .matches(regex.phoneNumber, "Telefone inválido"),
    chavePix: yup
      .string()
      .required("Uma chave Pix é obrigatória")
      .test(
        "test-name",
        "Entre uma chave Pix válida: Telefone, Email, CPF, CNPJ ou EVP",
        function (value) {
          let isValidEmail = regex.email.test(value);
          let isValidPhone = regex.phoneNumber.test(value);
          let isValidCPF = regex.validCPF.test(value);
          let isValidCNPJ = regex.validCNPJ.test(value);
          let isValidEVP = regex.validEVPPix.test(value);
          if (
            !isValidEmail &&
            !isValidPhone &&
            !isValidCPF &&
            !isValidCNPJ &&
            !isValidEVP
          ) {
            return false;
          }
          return true;
        }
      ),
  });

  await schema
    .validate(request.body)
    .then(() => {
      next();
    })
    .catch((err) => {
      return response.status(400).json({
        error: err.errors,
      });
    });
}

export default mentorValidator;
