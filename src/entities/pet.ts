import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { BaseModel } from "./baseModel";
import { User } from "./user";

/**
 * Represents an users pet.
 */
@Entity("pet")
export class Pet extends BaseModel {

  /**
   * Pet name.
   */
  @Column({ name: "name", type: "varchar", nullable: true })
  public name: string;

  /**
   * Foreign key to user table.
   */
  @ManyToOne(() => User, (user: User) => user.pets)
  @JoinColumn({ name: "user_id" })
  public user: User;
}
