import { SchoolResponse } from "./school.types";

export const SCHOOL_MESSAGE = {
  NOT_FOUND: new SchoolResponse(404, "SCHOOL NOT FOUND"),
  SCHOOL_UPDATED: new SchoolResponse(200, "SCHOOL UPATED"),
  SCHOOL_CREATED: new SchoolResponse(201, "SCHOOL CREATED"),
  SCHOOL_DELETED: new SchoolResponse(200, "SCHOOL DELETED"),
  SCHOOL_ASSIGNED: new SchoolResponse(201, "SCHOOL ASSIGNED"),
  SCHOOL_ALREADY_ASSIGNED: new SchoolResponse(404, "SCHOOL ALREADY ASSIGNED"),
};
