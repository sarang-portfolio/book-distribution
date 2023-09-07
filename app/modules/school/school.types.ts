type BOOK_STATUS = "PARTIAL" | "FULL" | "NONE";

export interface ISubject {
  subject: string;
  status: boolean;
}

export interface IAddSchool {
  id: string;
  schoolName: string;
  classStandard: number;
  subjects: string[];
}

export class SchoolResponse {
  constructor(public statusCode: number, public message: string) {}
}

export interface ISchool {
  id: string;
  schoolName: string;
  classStandard: number;
  subjects: ISubject[];
  classStatus: BOOK_STATUS;
}
