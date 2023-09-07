import { HISTORY_MESSAGE } from "./history.constants";
import historySchema from "./history.schema";

const getHistory = (userid: string) => {
  const history = historySchema.get(userid);
  if (history) {
    return history;
  }
  return HISTORY_MESSAGE.NOT_FOUND;
};

export default {
  getHistory,
};
