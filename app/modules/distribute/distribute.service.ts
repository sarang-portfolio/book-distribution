import distributeSchema from "./distribute.schema";
import schoolSchema from "../school/school.schema";
import { DISTRIBUTOR_MESSAGE } from "./distribute.constants";
import { ISubject } from "../school/school.types";

const distributeGetSchool = (userid: string) => {
  const assignedSchool = distributeSchema.getSchool(userid);
  if (assignedSchool) {
    return assignedSchool;
  }
  return DISTRIBUTOR_MESSAGE.SCHOOL_NOT_ASSIGNED;
};

const distributeGetClass = (userid: string, id: string) => {
  const schoolClasses = schoolSchema.getClass(userid, id);
  if (schoolClasses) {
    return schoolClasses;
  }
  return DISTRIBUTOR_MESSAGE.SCHOOL_NOT_FOUND;
};

const distributeGetSubject = (
  userid: string,
  schoolid: string,
  classid: number
) => {
  const schoolSubject = schoolSchema.getSubject(userid, schoolid, classid);
  if (schoolSubject) {
    return schoolSubject;
  }
  return DISTRIBUTOR_MESSAGE.SCHOOL_NOT_FOUND;
};

const distributeBook = (
  userid: string,
  schoolid: string,
  classid: number,
  book: ISubject
) => {
  const updateBooks = schoolSchema.updateSubject(
    userid,
    schoolid,
    classid,
    book
  );
  if (updateBooks) {
    return DISTRIBUTOR_MESSAGE.BOOKS_DISTRIBUTED;
  }
  return DISTRIBUTOR_MESSAGE.SCHOOL_NOT_FOUND;
};

export default {
  distributeGetSchool,
  distributeGetClass,
  distributeGetSubject,
  distributeBook,
};
