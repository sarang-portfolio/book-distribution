import { NextFunction, Request, Response, Router } from "express";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/response-handler";
import { ROLES } from "../roles/roles.constants";
import distributeService from "./distribute.service";

export const DistributeRouter = Router();

DistributeRouter.get(
  "/",
  permit([ROLES.WORKER]),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;
      const userID = user.id;
      const result = distributeService.distributeGetSchool(userID);
      res.send(new ResponseHandler(result));
    } catch (e) {
      next(e);
    }
  }
);

DistributeRouter.get("/:schoolId", permit([ROLES.WORKER]), (req, res, next) => {
  try {
    const user = res.locals.user;
    const userID = user.id;
    const schoolId = req.params.schoolId;
    const result = distributeService.distributeGetClass(userID, schoolId);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

DistributeRouter.get(
  "/:schoolId/:classId",
  permit([ROLES.WORKER]),
  (req, res, next) => {
    try {
      const user = res.locals.user;
      const userID = user.id;
      const schoolID = req.params.schoolId;
      const classID = parseInt(req.params.classId);
      const result = distributeService.distributeGetSubject(
        userID,
        schoolID,
        classID
      );
      res.send(new ResponseHandler(result));
    } catch (e) {
      next(e);
    }
  }
);

DistributeRouter.put(
  "/:schoolId/:classId",
  permit([ROLES.WORKER]),
  (req, res, next) => {
    try {
      const user = res.locals.user;
      const userID = user.id;
      const schoolID = req.params.schoolId;
      const classID = parseInt(req.params.classId);
      const book = req.body;
      const result = distributeService.distributeBook(
        userID,
        schoolID,
        classID,
        book
      );
      res.send(new ResponseHandler(result));
    } catch (e) {
      next(e);
    }
  }
);
