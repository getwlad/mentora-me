import { Router } from "express";

import studentValidator from "./middlewares/studentValidator.js";
import mentorValidator from "./middlewares/mentorValidator.js";
import userValidator from "./middlewares/userValidator.js";
import interestAreaValidator from "./middlewares/interestAreaValidator.js";
import mentorshipValidator from "./middlewares/mentorshipValidator.js";
import particularsValidator from "./middlewares/particularsValidator.js";

import CreateUserController from "./app/controllers/user/CreateUserController.js";
import DeleteUserController from "./app/controllers/user/DeleteUserController.js";
import ListUserController from "./app/controllers/user/ListUserController.js";
import ShowUserController from "./app/controllers/user/ShowUserController.js";
import UpdateUserController from "./app/controllers/user/UpdateUserController.js";

import CreateMentorController from "./app/controllers/mentor/CreateMentorController";
import ListMentorController from "./app/controllers/mentor/ListMentorController";
import ShowMentorController from "./app/controllers/mentor/ShowMentorController";
import UpdateMentorController from "./app/controllers/mentor/UpdateMentorController";
import DeleteMentorController from "./app/controllers/mentor/DeleteMentorController";

import CreateStudentController from "./app/controllers/student/CreateStudentController";
import ListStudentController from "./app/controllers/student/ListStudentController";
import ShowStudentController from "./app/controllers/student/ShowStudentController";
import UpdateStudentController from "./app/controllers/student/UpdateStudentController";
import DeleteStudentController from "./app/controllers/student/DeleteStudentController";
import MatchController from "./app/controllers/match/MatchController.js";
import AddInterestController from "./app/controllers/student/Interest/AddInterestController.js";
import ShowInterestController from "./app/controllers/student/Interest/ShowInterestController.js";
import ListInterestAreaController from "./app/controllers/interest/ListInterestAreaController.js";
import CreateInterestAreaController from "./app/controllers/interest/CreateInterestAreaController.js";

import CreateMentorshipController from "./app/controllers/mentor/mentorship/CreateMentorshipController.js";
import CreateStudentParticularsController from "./app/controllers/student/particulars/CreateStudentParticularsController.js";
import ShowStudentParticularsController from "./app/controllers/student/particulars/ShowStudentParticularsController.js";
import ShowMentorParticularsController from "./app/controllers/mentor/particulars/ShowMentorParticularsController.js";
import CreateMentorParticularsController from "./app/controllers/mentor/particulars/CreateMentorParticularsController.js";
import DeleteInterestController from "./app/controllers/student/Interest/DeleteInterestController.js";
import UpdateStudentParticularsController from "./app/controllers/student/particulars/UpdateStudentParticularsController.js";
import UpdateMentorParticularsController from "./app/controllers/mentor/particulars/UpdateMentorParticularsController.js";
import UpdateMentorshipController from "./app/controllers/mentor/mentorship/UpdateMentorshipController.js";
import ListMentorshipController from "./app/controllers/mentor/mentorship/ListMentorshipController.js";
import ShowMentorshipController from "./app/controllers/mentor/mentorship/ShowMentorshipController.js";
import DeleteMentorshipController from "./app/controllers/mentor/mentorship/DeleteMentorshipController.js";
import BuyMentorshipController from "./app/controllers/student/mentorship/BuyMentorshipController.js";
import ListBuyedMentorshipController from "./app/controllers/student/mentorship/ListBuyedMentorshipController.js";
import ListAllMentorshipController from "./app/controllers/mentorship/ListAllMentorshipController.js";
import SessionsController from "./app/controllers/sessions/SessionsController.js";
import AddBalanceController from "./app/controllers/wallet/balance/AddBalanceController";
import ListBalanceController from "./app/controllers/wallet/balance/ListBalanceController";

import authUser from "./middlewares/authUser.js";
import DeleteInterestAreaController from "./app/controllers/interest/DeleteInterestAreaController.js";

import balanceValidator from "./middlewares/balanceValidator.js";

const routes = new Router();

//Rotas get
//User
routes.get("/user/", (req, res) => {
  ListUserController.list(req, res);
  //#swagger.tags = ["User"]
});

routes.post("/user/login/", (req, res) => {
  SessionsController.create(req, res);
  //#swagger.tags = ["User"]
});
routes.post(
  "/user/",
  userValidator,
  (req, res) => CreateUserController.create(req, res)
  //#swagger.tags = ["User"]
);
//Student
routes.get("/student", (req, res) => ListStudentController.list(req, res));

//Mentor
routes.get("/mentor", (req, res) => ListMentorController.list(req, res));

routes.get("/mentor/mentorship", (req, res) => {
  ListMentorshipController.list(req, res);
});
routes.get("/mentor/particulars", (req, res) => {
  ShowMentorParticularsController.show(req, res);
});
routes.get("/mentorships", (req, res) => {
  ListAllMentorshipController.list(req, res);
});
//interest
routes.get("/interest", (req, res) => {
  ListInterestAreaController.list(req, res);
});
routes.get("/mentor/mentorship/:mentorshipId", (req, res) => {
  ShowMentorshipController.show(req, res);
});
routes.get("/mentor/:id/show", (req, res) =>
  ShowMentorController.show(req, res)
);
//Autenticacao
routes.use(authUser);

//Rotas User
routes.put("/user/", userValidator, (req, res) =>
  UpdateUserController.update(req, res)
);
routes.delete("/user/", (req, res) => DeleteUserController.delete(req, res));
routes.get("/user/show/", (req, res) => {
  ShowUserController.show(req, res);
  //#swagger.tags = ["User"]
});

//Rotas Student

routes.post("/student/", studentValidator, (req, res) =>
  CreateStudentController.create(req, res)
);
routes.put("/student/", studentValidator, (req, res) =>
  UpdateStudentController.update(req, res)
);
routes.delete("/student/", (req, res) =>
  DeleteStudentController.delete(req, res)
);
routes.get("/student/interest", (req, res) => {
  ShowInterestController.show(req, res);
});
routes.get("/student/show", (req, res) => ShowStudentController.show(req, res));
routes.get("/student/particulars", (req, res) => {
  ShowStudentParticularsController.show(req, res);
});

routes.post("/student/interest", interestAreaValidator, (req, res) => {
  AddInterestController.add(req, res);
});
routes.delete("/student/interest", interestAreaValidator, (req, res) => {
  DeleteInterestController.delete(req, res);
});

routes.post("/student/particulars", particularsValidator, (req, res) => {
  CreateStudentParticularsController.create(req, res);
});

routes.put("/student/particulars", particularsValidator, (req, res) => {
  UpdateStudentParticularsController.update(req, res);
});

routes.post("/student/buymentorship", (req, res) => {
  BuyMentorshipController.buy(req, res);
});
routes.get("/student/mentorship", (req, res) => {
  ListBuyedMentorshipController.list(req, res);
});

//Rotas Mentor

routes.post("/mentor/", mentorValidator, (req, res) =>
  CreateMentorController.create(req, res)
);
routes.put("/mentor/", mentorValidator, (req, res) =>
  UpdateMentorController.update(req, res)
);
routes.delete("/mentor/", (req, res) =>
  DeleteMentorController.delete(req, res)
);

routes.post("/mentor/mentorship", mentorshipValidator, (req, res) => {
  CreateMentorshipController.create(req, res);
});
routes.put("/mentor/mentorship/:mentorshipId", (req, res) => {
  UpdateMentorshipController.update(req, res);
});
routes.delete("/mentor/mentorship/:mentorshipId", (req, res) => {
  DeleteMentorshipController.delete(req, res);
});

routes.post("/mentor/particulars", particularsValidator, (req, res) => {
  CreateMentorParticularsController.create(req, res);
});

routes.put("/mentor/particulars", (req, res) => {
  UpdateMentorParticularsController.update(req, res);
});

//Rotas Interest
routes.post("/interest", interestAreaValidator, (req, res) => {
  CreateInterestAreaController.create(req, res);
});
routes.delete("/interest/:id", (req, res) => {
  DeleteInterestAreaController.delete(req, res);
});

//Wallet
routes.post("/balance", balanceValidator, (req, res) => {
  AddBalanceController.add(req, res);
});
routes.get("/balance", (req, res) => {
  ListBalanceController.list(req, res);
});
//Mentorships

//Rotas Match
routes.get("/student/match", (req, res) => {
  MatchController.match(req, res);
});

routes.get("*", (req, res) => {
  res.status(404).send("Rota não encontrada, verifique a url");
});
export default routes;
