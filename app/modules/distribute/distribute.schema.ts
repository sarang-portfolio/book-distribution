import { UserSchema } from "../user/user.schema";

class DistributorSchema {
  getSchool(userid: string) {
    const worker = UserSchema.userDb.find((d) => d.id === userid);
    if (worker) {
      return worker.assignedSchool;
    }
    return false;
  }
}

const distributeSchema = new DistributorSchema();

export default distributeSchema;
