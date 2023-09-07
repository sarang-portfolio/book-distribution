import { Router } from "express";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/response-handler";
import { ROLES } from "../roles/roles.constants";
import userService from "./user.service";

export const UserRouter = Router();

UserRouter.get("/", permit([ROLES.ADMIN]), (req, res, next) => {
  try {
    const result = userService.getWorkerList();
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

UserRouter.get("/pendingusers", permit([ROLES.ADMIN]), (req, res, next) => {
  try {
    const result = userService.getPendingUser();
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

UserRouter.put("/approveuser/:id", permit([ROLES.ADMIN]), (req, res, next) => {
  try {
    const userID = req.params.id;
    const result = userService.approvePendingUser(userID);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});
