import { Router } from "express";
import { TraerEquipos } from "../controllers/equiposController.js";

const EquiposRouter = Router();

EquiposRouter.get("/equipos", TraerEquipos)

export default EquiposRouter