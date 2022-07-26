import yup from "yup";

import regex from "../libs/regexValidator.js";

async function mentorValidator(request, response, next) {
    const schema = yup.object().shape({ 
      name: yup
      .string()
      .required("Seu nome é obrigatório.")
      .matches(regex),
      email: yup
      .string()
      .email("Email inválido.")
      .required("Seu email é obrigatório"),
      password: yup
      .string()
      .required("Sua senha é obrigatória.")
      .min(8, "A senha deve ter um mínimo de 8 caracteres.")
      .matches(regex.password, "A senha deve conter letras e números."),
      cpf: yup
      .string()
      .required("Seu CPF é obrigatório")
      .matches(regex.validCPF, "CPF inválido"),
      phone: yup
      .string()
      .required("Seu telefone é obrigatório.")
      .matches(regex.phoneNumber, "Telefone inválido.")
      
    });
    
    await schema.validate(request.body).catch((err) => {
        return response.status(400).json({
          error: err.errors,
        });
      });
      next();
    }

export default mentorValidator;





