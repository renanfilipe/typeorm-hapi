import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { BaseModel } from "./baseModel";
import { User } from "./user";

@Entity("account")
export class Account extends BaseModel {
  @Column({ name: "number", type: "integer", nullable: false })
  public number: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  public user: User;
}
