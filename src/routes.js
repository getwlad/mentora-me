import { Router } from "express";

import studentValidator from "./middlewares/studentValidator.js";
import studentController from "./app/controllers/student/StudentController.js";

import mentorValidator from "./middlewares/mentorValidator";
import MentorController from "./app/controllers/mentor/MentorController";

const routes = new Router();

routes.post("/cadastro/", (req, res) => {
  res.json({ msg: "funcionando" });
});

routes.get("/students", studentController.list);
routes.get("/students/:id", studentController.show);
routes.post("/students", studentValidator, studentController.create);
routes.put("/students/:id", studentValidator, studentController.update);
routes.delete("/students/:id", studentController.delete);

routes.get("/controllers", MentorController.list);
routes.get("/controllers/:id", MentorController.show);
routes.post("/controllers", mentorValidator, MentorController.create);
routes.put("/controllers:id", mentorValidator, MentorController.update);
routes.delete("/controllers:id", MentorController.delete);

export default routes;
