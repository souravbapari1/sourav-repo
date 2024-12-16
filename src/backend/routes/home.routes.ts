import { homeGetController } from "../controller/home.controller";
import { Router } from "express";
const homeRoutes = Router();
homeRoutes.post("/", homeGetController);

export default homeRoutes;
