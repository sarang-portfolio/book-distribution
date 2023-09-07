import { Router } from "express";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/response-handler";
import { ROLES } from "../roles/roles.constants";
import schoolService from "./school.service";

export const SchoolRouter = Router();

SchoolRouter.post("/addschool", permit([ROLES.ADMIN]), (req, res, next) => {
  try {
    const school = req.body;
    const result = schoolService.createSchool(school);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

SchoolRouter.get("/:id", permit([ROLES.ADMIN]), (req, res, next) => {
  try {
    const school = req.params.id;
    const result = schoolService.getOneSchool(school);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

SchoolRouter.put(
  "/assignworker/:id",
  permit([ROLES.ADMIN]),
  (req, res, next) => {
    try {
      const workerID = req.params.id;
      const { assignedSchool } = req.body;
      const result = schoolService.assignSchool(workerID, assignedSchool);
      res.send(new ResponseHandler(result));
    } catch (e) {
      next(e);
    }
  }
);
