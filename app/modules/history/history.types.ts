import { ISchool } from "../school/school.types";

export interface IHistory {
  id: string;
  updatedBy: string;
  updatedAt: string;
  data: ISchool[];
}

export class HistoryResponse {
  constructor(public statusCode: number, public message: string) {}
}
