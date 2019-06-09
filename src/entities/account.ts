import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { BaseModel } from "./baseModel";
import { User } from "./user";

/**
 * Account entity, each user has one account and each account belongs to a single user.
 */
@Entity("account")
export class Account extends BaseModel {

  /**
   * Account number.
   */
  @Column({ name: "number", type: "varchar", length: 20, nullable: false })
  public number: string;

  /**
   * Foreign key to user table.
   */
  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  public user: User;
}
