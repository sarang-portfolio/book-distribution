import { Router } from "express";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/response-handler";
import { ROLES } from "../roles/roles.constants";
import userService from "../user/user.service";
import historyService from "./history.service";

export const HistoryRouter = Router();

HistoryRouter.get("/", permit([ROLES.ADMIN]), (req, res, next) => {
  try {
    const result = userService.getWorkerList();
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

HistoryRouter.get("/:id", permit([ROLES.ADMIN]), (req, res, next) => {
  try {
    const userid = req.params.id;
    const result = historyService.getHistory(userid);
    res.send(result);
  } catch (e) {
    next(e);
  }
});
