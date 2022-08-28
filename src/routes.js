import { Router } from "express";

import studentValidator from "./middlewares/studentValidator.js";
import mentorValidator from "./middlewares/mentorValidator.js";

import CreateUserController from "./app/controllers/user/CreateUserController.js";

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

const routes = new Router();

const createStudentController = new CreateStudentController();
const listStudentController = new ListStudentController();
const showStudentController = new ShowStudentController();
const updateStudentController = new UpdateStudentController();
const deleteStudentController = new DeleteStudentController();

const createMentorController = new CreateMentorController();
const listMentorController = new ListMentorController();
const showMentorController = new ShowMentorController();
const updateMentorController = new UpdateMentorController();
const deleteMentorController = new DeleteMentorController();

routes.post("/cadastro/", (req, res) => {
  res.json({ msg: "funcionando" });
});

routes.post("/user/", CreateUserController.create);

routes.get("/students", (req, res) => listStudentController.list(req, res));
routes.get("/students/:id", (req, res) => showStudentController.show(req, res));
routes.post("/students/:user", studentValidator, (req, res) =>
  createStudentController.create(req, res)
);
routes.put("/students/:id", studentValidator, (req, res) =>
  updateStudentController.update(req, res)
);
routes.delete("/students/:id", (req, res) =>
  deleteStudentController.delete(req, res)
);

routes.get("/mentor", (req, res) => listMentorController.list(req, res));
routes.get("/mentor/:id", (req, res) => showMentorController.show(req, res));
routes.post("/mentor", mentorValidator, (req, res) =>
  createMentorController.create(req, res)
);
routes.put("/mentor/:id", mentorValidator, (req, res) =>
  updateMentorController.update(req, res)
);
routes.delete("/mentor/:id", (req, res) =>
  deleteMentorController.delete(req, res)
);

export default routes;
