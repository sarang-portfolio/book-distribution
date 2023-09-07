import { SCHOOL_MESSAGE } from "./school.constants";
import schoolSchema from "./school.schema";
import { IAddSchool } from "./school.types";

const createSchool = (school: IAddSchool) => {
  const created = schoolSchema.create(school);
  if (created) {
    return created;
  }
};

const getOneSchool = (id: string) => {
  const school = schoolSchema.getOne(id);
  if (school) {
    return school;
  }
  return SCHOOL_MESSAGE.NOT_FOUND;
};

const assignSchool = (id: string, schools: string[]) => {
  const assigned = schoolSchema.updateAssignedSchool(id, schools);
  if (assigned) {
    return assigned;
  }
  return SCHOOL_MESSAGE.SCHOOL_ALREADY_ASSIGNED;
};

export default {
  createSchool,
  getOneSchool,
  assignSchool,
};
