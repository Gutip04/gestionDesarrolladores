import {Router} from "express"
import { traerRoles } from "../controllers/rolesController.js"

const rolesRouter = Router()

rolesRouter.get("/roles", traerRoles)

export default rolesRouter