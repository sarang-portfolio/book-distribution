import { IExcludedPaths } from "../../utility/authorize";
import { AuthRouter } from "../auth/auth.routes";
import { DistributeRouter } from "../distribute/distribute.routes";
import { HistoryRouter } from "../history/history.routes";
import { SchoolRouter } from "../school/school.routes";
import { UserRouter } from "../user/user.routes";
import { Route, Routes } from "./routes.types";

export const routes: Routes = [
  new Route("/school", SchoolRouter),
  new Route("/distribute", DistributeRouter),
  new Route("/auth", AuthRouter),
  new Route("/user", UserRouter),
  new Route("/history", HistoryRouter),
];

export const excludedPaths: IExcludedPaths[] = [
  { path: "/auth/login", method: "POST" },
  { path: "/auth/signup", method: "POST" },
];
