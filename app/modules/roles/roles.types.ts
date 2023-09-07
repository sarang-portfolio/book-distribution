export type RoleName = "WORKER" | "ADMIN";

export class Role {
  constructor(public id: string, public name: RoleName) {}
}
