import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { BaseModel } from "./baseModel";
import { User } from "./user";

@Entity("pet")
export class Pet extends BaseModel {
  @Column({ name: "name", type: "varchar", nullable: true })
  public name: string;

  @ManyToOne(() => User, (user: User) => user.pets)
  @JoinColumn({ name: "user_id" })
  public user: User;
}
