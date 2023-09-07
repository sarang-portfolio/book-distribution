import { v4 } from "uuid";
import { sendEmail } from "../../utility/email";
import { createHash } from "../../utility/password";
import { IUser } from "./user.types";

export class UserSchema {
  public static userDb: IUser[] = [
    {
      id: "1",
      username: "Sarang",
      email: "sarang.kulkarni999@gmail.com",
      password: createHash("1234"),
      role: "0a85908d-6574-441f-8a88-a7d7ef4aa947",
    },
    {
      id: "2",
      username: "Rahul",
      email: "rahul.mane@coditas.com",
      password: createHash("1234"),
      role: "a1fb54a0-659c-423d-81d5-1cda568459db",
      accountStatus: true,
      assignedSchool: ["1"],
    },
  ];

  get() {
    return UserSchema.userDb;
  }

  getWorker() {
    return UserSchema.userDb.filter(
      (r) => r.role === "a1fb54a0-659c-423d-81d5-1cda568459db"
    );
  }

  create(user: IUser) {
    UserSchema.userDb.push({
      ...user,
      id: v4(),
      role: "a1fb54a0-659c-423d-81d5-1cda568459db",
      accountStatus: false,
      assignedSchool: [],
    });
    return true;
  }

  getUser() {
    return UserSchema.userDb.filter((status) => status.accountStatus === false);
  }

  updateUserStatus(user: IUser) {
    user.accountStatus = true;
    sendEmail(
      user.email,
      "Account Authorized",
      `
            Hi ${user.username},

            Your Account is Approved! Kindly login to the website.
        `
    );
    return user;
  }

  delete(userid: string) {
    const userIndex = UserSchema.userDb.findIndex((u) => u.id === userid);
    if (userIndex !== -1) {
      UserSchema.userDb.splice(userIndex, 1);
      return true;
    }
    return false;
  }
}

const userSchema = new UserSchema();

export default userSchema;
