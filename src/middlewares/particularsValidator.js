import * as yup from "yup";
import regex from "../libs/regexValidators";

async function particularsValidator(request, response, next) {
  const schema = yup.object().shape({
    extrovert: yup
      .string()
      .required("Característica obrigatória.")
      .matches(regex.validScale, "Preencha numa escala de 1 a 3."),
    theory: yup
      .string()
      .required("Característica obrigatória.")
      .matches(regex.validScale, "Preencha numa escala de 1 a 3."),
    practice: yup
      .string()
      .required("Característica obrigatória.")
      .matches(regex.validScale, "Preencha numa escala de 1 a 3."),
    mentoring_in_group: yup
      .string()
      .required("Característica obrigatória.")
      .matches(regex.validScale, "Preencha numa escala de 1 a 3."),
    mentoring_individual: yup
      .string()
      .required("Característica obrigatória.")
      .matches(regex.validScale, "Preencha numa escala de 1 a 3."),
    libras: yup
      .string()
      .required("Característica obrigatória.")
      .matches(regex.validScale, "Preencha numa escala de 1 a 3."),
    minority_groups: yup
      .string()
      .required("Característica obrigatória.")
      .matches(regex.validScale, "Preencha numa escala de 1 a 3."),
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

export default particularsValidator;
