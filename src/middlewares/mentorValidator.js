import * as yup from "yup";
import regex from "../libs/regexValidators";

async function mentorValidator(request, response, next) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Seu nome é obrigatório.")
      .matches(regex.name, "Nome inválido"),
    cnpj: yup
      .string()
      .required("Seu CNPJ é obrigatório")
      .matches(regex.validCPF, "CNPJ inválido"),
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
        "test-chave-pix",
        "Entre uma chave Pix válida: Telefone, Email, CPF, CNPJ ou EVP",
        (value) => {
          const isValidEmail = regex.emailRegex.test(value);
          const isValidPhone = regex.phoneNumber.test(value);
          const isValidCPF = regex.validCPF.test(value);
          const isValidCNPJ = regex.validCNPJ.test(value);
          const isValidEVP = regex.validEVPPix.test(value);
          return (
            isValidEmail ||
            isValidPhone ||
            isValidCPF ||
            isValidCNPJ ||
            isValidEVP
          );
        }
      ),
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

export default mentorValidator;
