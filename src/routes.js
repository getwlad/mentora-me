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
import ShowMentorshipController from "./app/controllers/mentor/mentorship/ShowMentorshipController.js";
import CreateMentorshipController from "./app/controllers/mentor/mentorship/CreateMentorshipController.js";
import CreateStudentParticularsController from "./app/controllers/student/particulars/CreateStudentParticularsController.js";
import ShowStudentParticularsController from "./app/controllers/student/particulars/ShowStudentParticularsController.js";
import ShowMentorParticularsController from "./app/controllers/mentor/particulars/ShowMentorParticularsController.js";
import CreateMentorParticularsController from "./app/controllers/mentor/particulars/CreateMentorParticularsController.js";

const routes = new Router();

//Rotas User
routes.get("/user/", (req, res) => ListUserController.list(req, res));
routes.get("/user/:id", (req, res) => ShowUserController.show(req, res));
routes.post("/user/", userValidator, (req, res) =>
  CreateUserController.create(req, res)
);
routes.put("/user/:id", userValidator, (req, res) =>
  UpdateUserController.update(req, res)
);
routes.delete("/user/:id", (req, res) => DeleteUserController.delete(req, res));

//Rotas Student
routes.get("/student", (req, res) => ListStudentController.list(req, res));
routes.get("/student/:id", (req, res) => ShowStudentController.show(req, res));
routes.post("/student/:user", studentValidator, (req, res) =>
  CreateStudentController.create(req, res)
);
routes.put("/student/:id", studentValidator, (req, res) =>
  UpdateStudentController.update(req, res)
);
routes.delete("/student/:id", (req, res) =>
  DeleteStudentController.delete(req, res)
);
routes.get("/student/:id/interest", (req, res) => {
  ShowInterestController.show(req, res);
});
routes.post("/student/:id/interest", (req, res) => {
  AddInterestController.add(req, res);
});

routes.get("/student/:id/particulars", (req, res) => {
  ShowStudentParticularsController.show(req, res);
});

routes.post("/student/:id/particulars", (req, res) => {
  CreateStudentParticularsController.create(req, res);
});

//Rotas Mentor
routes.get("/mentor", (req, res) => ListMentorController.list(req, res));
routes.get("/mentor/:id", (req, res) => ShowMentorController.show(req, res));
routes.post("/mentor/:user", mentorValidator, (req, res) =>
  CreateMentorController.create(req, res)
);
routes.put("/mentor/:id", mentorValidator, (req, res) =>
  UpdateMentorController.update(req, res)
);
routes.delete("/mentor/:id", (req, res) =>
  DeleteMentorController.delete(req, res)
);

routes.get("/mentor/:id/mentorship", (req, res) => {
  ShowMentorshipController.show(req, res);
});
routes.post("/mentor/:id/mentorship", (req, res) => {
  CreateMentorshipController.create(req, res);
});

routes.get("/mentor/:id/particulars", (req, res) => {
  ShowMentorParticularsController.show(req, res);
});

routes.post("/mentor/:id/particulars", (req, res) => {
  CreateMentorParticularsController.create(req, res);
});

//Rotas Interest
routes.get("/interest", (req, res) => {
  ListInterestAreaController.list(req, res);
});
routes.post("/interest", (req, res) => {
  CreateInterestAreaController.create(req, res);
});

//Rotas Match
routes.get("/student/:id/match", (req, res) => {
  MatchController.match(req, res);
});

export default routes;
