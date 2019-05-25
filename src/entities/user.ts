import { Column, Entity, OneToMany, OneToOne } from "typeorm";

import { BaseModel } from "./baseModel";
import { Account, Pet } from "./index";

@Entity("user")
export class User extends BaseModel {

  @OneToOne(() => Account, (account: Account) => account.user)
  public account: Account;

  @Column({ name: "age", type: "integer", nullable: false })
  public age: number;

  @Column({ name: "document", type: "varchar", nullable: false, unique: true })
  public document: string;

  @Column({ name: "first_name", type: "varchar", nullable: true, length: 100 })
  public firstName: string | undefined;

  @Column({ name: "last_name", type: "varchar", nullable: false, length: 100 })
  public lastName: string | undefined;

  @OneToMany(() => Pet, (pet: Pet) => pet.user)
  public pets: Pet[];
}
