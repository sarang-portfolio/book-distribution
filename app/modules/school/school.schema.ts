import { v4 } from "uuid";
import { HistorySchema } from "../history/history.schema";
import { UserSchema } from "../user/user.schema";
import { IAddSchool, ISchool, ISubject } from "./school.types";

class SchoolSchema {
  public static schoolDb: ISchool[] = [
    {
      id: "1",
      schoolName: "School 1",
      classStandard: 1,
      subjects: [
        { subject: "English", status: false },
        { subject: "Maths", status: false },
      ],
      classStatus: "NONE",
    },
  ];

  create(school: IAddSchool) {
    const { schoolName, classStandard, subjects } = school;
    const newSubjects: ISubject[] = [];
    for (let subject of subjects) {
      newSubjects.push({ subject, status: false });
    }
    for (let i = 1; i <= classStandard; i++) {
      const newSchool: ISchool = {
        id: v4(),
        schoolName,
        classStandard: i,
        subjects: newSubjects,
        classStatus: "NONE",
      };
      SchoolSchema.schoolDb.push(newSchool);
    }
    return SchoolSchema.schoolDb;
  }

  getOne(id: string) {
    const school = this.getSchoolById(id);
    if (school) {
      return school;
    }
    return false;
  }

  getClass(userid: string, id: string) {
    const user = UserSchema.userDb.find((u) => u.id === userid);
    const classes = [];
    if (user) {
      for (let school of user.assignedSchool as string[]) {
        if (school === id) {
          const assignedSchool = this.getSchoolById(school);
          for (let standard of assignedSchool) {
            classes.push(standard.classStandard);
          }
          return classes;
        }
      }
    }
    return false;
  }

  getSubject(userid: string, schoolid: string, classid: number) {
    const user = UserSchema.userDb.find((u) => u.id === userid);
    if (user) {
      for (let school of user.assignedSchool as string[]) {
        if (school === schoolid) {
          const assignedSchool = this.getSchoolById(school);
          for (let subjects of assignedSchool) {
            if (subjects.classStandard === classid) {
              const subjectArray = Object.values(subjects.subjects);
              return subjectArray;
            }
          }
        }
      }
    }
    return false;
  }

  updateSubject(
    userid: string,
    schoolid: string,
    classid: number,
    book: ISubject
  ) {
    const user = UserSchema.userDb.find((u) => u.id === userid);
    if (user) {
      for (let school of user.assignedSchool as string[]) {
        if (school === schoolid) {
          const assignedSchoolIndex = SchoolSchema.schoolDb.findIndex(
            (s) => s.id === school && s.classStandard === classid
          );
          const assignedSchool = SchoolSchema.schoolDb[assignedSchoolIndex];
          const assignedSchoolCopy = { ...assignedSchool };
          for (let subject of assignedSchool.subjects) {
            if (subject.subject === book.subject) {
              subject.status = book.status;
            }
            let statusArr = [subject.status];
            let count = statusArr.filter(Boolean).length;
            if (count === statusArr.length) {
              assignedSchool.classStatus = "FULL";
            } else if (count < statusArr.length) {
              assignedSchool.classStatus = "PARTIAL";
            } else if (count === 0) {
              assignedSchool.classStatus = "NONE";
            }
          }
          HistorySchema.historyDb.push({
            id: v4(),
            updatedBy: userid,
            updatedAt: new Date().toLocaleString(),
            data: [assignedSchoolCopy],
          });
        }
      }
      return true;
    }
  }

  getSchoolById(id: string) {
    return SchoolSchema.schoolDb.filter((s) => s.id === id);
  }

  updateAssignedSchool(id: string, schools: string[]) {
    const user = UserSchema.userDb.find((u) => u.id === id);
    if (user) {
      const assignedSchoolArray = user.assignedSchool;
      for (let school of schools) {
        if (
          !user.assignedSchool?.includes(school) &&
          (assignedSchoolArray?.length as any) <= 3
        ) {
          user.assignedSchool?.push(school);
        }
      }
      return user.assignedSchool;
    }
  }
}

const schoolSchema = new SchoolSchema();

export default schoolSchema;
