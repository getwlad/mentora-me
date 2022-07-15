import { Router } from "express";

const routes = new Router();

routes.post("/cadastro/", (req, res) => {
  res.json({ msg: "funcionando" });
});

export default routes;
