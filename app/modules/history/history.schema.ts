import { IHistory } from "./history.types";

export class HistorySchema {
  public static historyDb: IHistory[] = [
    {
      id: "1",
      updatedBy: "1",
      updatedAt: "28/9/2022, 4:41:04 pm",
      data: [
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
      ],
    },
  ];

  get(userid: string) {
    const user = HistorySchema.historyDb.filter((u) => u.updatedBy === userid);
    if (user) {
      return user;
    }
    return false;
  }
}

const historySchema = new HistorySchema();
export default historySchema;
