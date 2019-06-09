import { Column, Entity, OneToMany, OneToOne } from "typeorm";

import { BaseModel } from "./baseModel";
import { Account, Pet } from "./index";

/**
 * Represents an user, the model saves some basic information such as name and age.
 */
@Entity("user")
export class User extends BaseModel {

  /**
   * User account, it has the relation one to one with the account table.
   */
  @OneToOne(() => Account, (account: Account) => account.user)
  public account: Account;

  /**
   * User age.
   */
  @Column({ name: "age", type: "integer", nullable: false })
  public age: number;

  /**
   * User document, it contains only numbers.
   */
  @Column({ name: "document", type: "varchar", nullable: false, unique: true })
  public document: string;

  /**
   * User first name.
   */
  @Column({ name: "first_name", type: "varchar", nullable: true, length: 100 })
  public firstName?: string;

  /**
   * User last name.
   */
  @Column({ name: "last_name", type: "varchar", nullable: false, length: 100 })
  public lastName?: string;

  /**
   * Counter side of the relation with the pet table. One user can have multiple pets.
   */
  @OneToMany(() => Pet, (pet: Pet) => pet.user)
  public pets: Pet[];
}
