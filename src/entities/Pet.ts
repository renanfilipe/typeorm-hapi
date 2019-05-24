import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { BaseModel } from "./BaseModel";
import { User } from "./User";

@Entity("pet")
export class Pet extends BaseModel {
  @Column({ name: "name", type: "varchar", nullable: true })
  public name: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  public user: User;
}
