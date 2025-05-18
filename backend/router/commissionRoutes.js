import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { proofOfCommission } from "../controller/commissionController.js";

const routes = express.Router();

routes.post('/proof',isAuthenticated,isAuthorized('Auctioneer'),proofOfCommission);

export default routes;