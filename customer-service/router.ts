import { Router } from "express";
import ReportController from './controller'
const router = Router();

router.get('/report', ReportController.getReport)



export default router