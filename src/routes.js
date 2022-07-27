import { Router } from "express";
import studentValidator from "./middlewares/studentValidator.js";
import mentorValidator from "./middlewares/mentorValidator.js";
import studentController from "./app/controllers/student/StudentController.js";
import mentorController from "./app/controllers/mentor/MentorController.js";

const routes = new Router();

routes.post("/cadastro/", (req, res) => {
  res.json({ msg: "funcionando" });
});

routes.get("/students", studentController.list);
routes.get("/students/:id", studentController.show);
routes.post("/students", studentValidator, studentController.create);
routes.put("/students/:id", studentValidator, studentController.update);
routes.delete("/students/:id", studentController.delete);

routes.get("/mentor", mentorController.list);
routes.get("/mentor/:id", mentorController.show);
routes.post("/mentor", mentorValidator ,mentorController.create);
routes.put("/mentor/:id", mentorValidator, mentorController.update);
routes.delete("/mentor/:id", mentorController.delete);

export default routes;
