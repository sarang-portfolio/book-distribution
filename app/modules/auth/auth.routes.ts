import { NextFunction, Request, Response, Router } from "express";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/response-handler";
import { ROLES } from "../roles/roles.constants";
import userService from "../user/user.service";
import authService from "./auth.service";
import { SignupValidator } from "./auth.validations";

export const AuthRouter = Router();

AuthRouter.post("/login", (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = authService.login(req.body);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

AuthRouter.post(
  "/signup",
  SignupValidator,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = authService.signup(req.body);
      res.send(new ResponseHandler(result));
    } catch (e) {
      next(e);
    }
  }
);

AuthRouter.put("/:userid", permit([ROLES.ADMIN]), (req, res, next) => {
  try {
    const userID = req.params.userid;
    const result = userService.approvePendingUser(userID);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

AuthRouter.delete("/:userid", permit([ROLES.ADMIN]), (req, res, next) => {
  try {
    const userID = req.params.userid;
    const result = userService.deleteWorker(userID);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});
