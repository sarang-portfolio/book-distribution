import { ROLES } from "./roles.constants";
import { Role } from "./roles.types";

class RoleSchema {
  public static roleDb: Role[] = [
    new Role(ROLES.ADMIN, "ADMIN"),
    new Role(ROLES.ISSUER, "WORKER"),
  ];
}

const roleSchema = new RoleSchema();

export default roleSchema;
