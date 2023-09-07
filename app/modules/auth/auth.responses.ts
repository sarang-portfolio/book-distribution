import { AuthResponses } from "./auth.types";

export const AUTH_ERRORS = {
  NOT_FOUND: new AuthResponses(404, "INVALID CREDENTIALS"),
  INTERNAL: new AuthResponses(500, "User not created"),
};
