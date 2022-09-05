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
import SetInterestController from "./app/controllers/student/Interest/SetInterestController.js";
import ShowInterestController from "./app/controllers/student/Interest/ShowInterestController.js";

const routes = new Router();

routes.get("/user/", (req, res) => ListUserController.list(req, res));
routes.get("/user/:id", (req, res) => ShowUserController.show(req, res));
routes.post("/user/", userValidator, (req, res) =>
  CreateUserController.create(req, res)
);
routes.put("/user/:id", userValidator, (req, res) =>
  UpdateUserController.update(req, res)
);
routes.delete("/user/:id", (req, res) => DeleteUserController.delete(req, res));

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

routes.get("/student/match", (req, res) => {
  MatchController.list(req, res);
});

routes.get("/student/:id/interest", (req, res) => {
  ShowInterestController.show(req, res);
});
routes.post("/interest/", (req, res) => {
  SetInterestController.set(req, res);
});

export default routes;
