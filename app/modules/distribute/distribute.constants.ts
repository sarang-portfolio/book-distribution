import { DistributorResponse } from "./distribute.types";

export const DISTRIBUTOR_MESSAGE = {
  SCHOOL_NOT_ASSIGNED: new DistributorResponse(404, "NO SCHOOL ASSIGNED"),
  BOOKS_DISTRIBUTED: new DistributorResponse(200, "BOOK DISTRIBUTED"),
  SCHOOL_NOT_FOUND: new DistributorResponse(404, "SCHOOL NOT FOUND"),
};
