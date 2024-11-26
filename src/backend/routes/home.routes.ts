import { homeGetController } from "../controller/home.controller";
import { Router } from "express";
const homeRoutes = Router();
homeRoutes.get("/", homeGetController);

export default homeRoutes;
