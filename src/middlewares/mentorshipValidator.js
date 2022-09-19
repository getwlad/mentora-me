import * as yup from "yup";
import regex from "../libs/regexValidators";

async function mentorshipValidator(request, response, next) {
  const schema = yup.object().shape({
    name: yup.string().required("Nome obrigatório."),

    price: yup
      .string()
      .required("Preço obrigatório.")
      .matches(regex.validPrice, "Preço inválido."),
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

export default mentorshipValidator;
