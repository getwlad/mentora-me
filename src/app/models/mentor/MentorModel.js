function MentorModel(
  id,
  name,
  email,
  password,
  cpf,
  publicEmail,
  phone,
  chavePix
) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.cpf = cpf;
  (this.publicEmail = publicEmail), (this.phone = phone);
  this.chavePix = chavePix;
}

export default MentorModel;
