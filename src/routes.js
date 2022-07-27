import { Router } from "express";
import studentValidator from "./middlewares/studentValidator.js";
import studentController from "./app/controllers/student/StudentController.js";

const routes = new Router();

routes.post("/cadastro/", (req, res) => {
  res.json({ msg: "funcionando" });
});

routes.get("/students", studentController.list);
routes.get("/students/:id", studentController.show);
routes.post("/students", studentValidator, studentController.create);
routes.put("/students/:id", studentValidator, studentController.update);
routes.delete("/students/:id", studentController.delete);

export default routes;
