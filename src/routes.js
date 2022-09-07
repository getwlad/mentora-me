import { Router } from "express";

import studentValidator from "./middlewares/studentValidator.js";
import mentorValidator from "./middlewares/mentorValidator.js";
import userValidator from "./middlewares/userValidator.js";

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

import authUser from "./middlewares/authUser.js";

const routes = new Router();

//Rotas User
routes.get("/user/", (req, res) => ListUserController.list(req, res));
routes.get("/user/:id", (req, res) => ShowUserController.show(req, res));
routes.post("/user/", userValidator, (req, res) =>
  CreateUserController.create(req, res)
);
routes.put("/user/:id", userValidator, authUser, (req, res) =>
  UpdateUserController.update(req, res)
);
routes.delete("/user/:id", authUser, (req, res) =>
  DeleteUserController.delete(req, res)
);

routes.post("/user/login/", (req, res) => {
  SessionsController.create(req, res);
});

//Rotas Student
routes.get("/student", (req, res) => ListStudentController.list(req, res));
routes.get("/student/:id", authUser, (req, res) =>
  ShowStudentController.show(req, res)
);
routes.post("/student/", authUser, studentValidator, (req, res) =>
  CreateStudentController.create(req, res)
);
routes.put("/student/:id", authUser, studentValidator, (req, res) =>
  UpdateStudentController.update(req, res)
);
routes.delete("/student/:id", authUser, (req, res) =>
  DeleteStudentController.delete(req, res)
);
routes.get("/student/:id/interest", (req, res) => {
  ShowInterestController.show(req, res);
});
routes.post("/student/:id/interest", authUser, (req, res) => {
  AddInterestController.add(req, res);
});
routes.delete("/student/:id/interest", authUser, (req, res) => {
  DeleteInterestController.delete(req, res);
});

routes.get("/student/:id/particulars", (req, res) => {
  ShowStudentParticularsController.show(req, res);
});

routes.post("/student/:id/particulars", authUser, (req, res) => {
  CreateStudentParticularsController.create(req, res);
});

routes.put("/student/:id/particulars", authUser, (req, res) => {
  UpdateStudentParticularsController.update(req, res);
});

routes.post("/student/:id/buymentorship", authUser, (req, res) => {
  BuyMentorshipController.buy(req, res);
});
routes.get("/student/:id/mentorship", authUser, (req, res) => {
  ListBuyedMentorshipController.list(req, res);
});

//Rotas Mentor
routes.get("/mentor", (req, res) => ListMentorController.list(req, res));
routes.get("/mentor/:id", (req, res) => ShowMentorController.show(req, res));
routes.post("/mentor/", authUser, mentorValidator, (req, res) =>
  CreateMentorController.create(req, res)
);
routes.put("/mentor/:id", authUser, mentorValidator, (req, res) =>
  UpdateMentorController.update(req, res)
);
routes.delete("/mentor/:id", authUser, (req, res) =>
  DeleteMentorController.delete(req, res)
);

routes.get("/mentor/:id/mentorship", (req, res) => {
  ListMentorshipController.list(req, res);
});
routes.get("/mentor/:id/mentorship/:mentorshipId", (req, res) => {
  ShowMentorshipController.show(req, res);
});
routes.post("/mentor/:id/mentorship", authUser, (req, res) => {
  CreateMentorshipController.create(req, res);
});
routes.put("/mentor/:id/mentorship/:mentorshipId", authUser, (req, res) => {
  UpdateMentorshipController.update(req, res);
});
routes.delete("/mentor/:id/mentorship/:mentorshipId", authUser, (req, res) => {
  DeleteMentorshipController.delete(req, res);
});

routes.get("/mentor/:id/particulars", (req, res) => {
  ShowMentorParticularsController.show(req, res);
});

routes.post("/mentor/:id/particulars", authUser, (req, res) => {
  CreateMentorParticularsController.create(req, res);
});

routes.put("/mentor/:id/particulars", authUser, (req, res) => {
  UpdateMentorParticularsController.update(req, res);
});

//Rotas Interest
routes.get("/interest", (req, res) => {
  ListInterestAreaController.list(req, res);
});
routes.post("/interest", (req, res) => {
  CreateInterestAreaController.create(req, res);
});

//Mentorships
routes.get("/mentorships", (req, res) => {
  ListAllMentorshipController.list(req, res);
});

//Rotas Match
routes.get("/student/:id/match", authUser, (req, res) => {
  MatchController.match(req, res);
});

export default routes;
