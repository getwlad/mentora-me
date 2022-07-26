import { response, Router } from "express";

import mentorValidator from "./src/app/middlewares/mentorValidator";

import MentorController from "./src/app/controllers/MentorController";

const routes = new Router();

routes.post("/cadastro/", (request, response) => {
    response.json({msg: funcionando});
});

routes.get("/controllers", MentorController.list);
routes.get("/controllers", MentorController.show);
routes.post("/controllers", mentorValidator, MentorController.create);
routes.put("/controllers:id", mentorValidator, MentorController.update);
routes.delete("/controllers:id", MentorController.delete);

export default routes;