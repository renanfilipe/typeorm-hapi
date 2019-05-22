import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { BaseModel } from "./BaseModel";
import { User } from "./User";

@Entity("account")
export class Account extends BaseModel {
  @Column({ name: "number", type: "integer", nullable: false })
  public number: number;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id" })
  public user: User;
}
