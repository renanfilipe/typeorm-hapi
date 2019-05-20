import { Column, Entity } from "typeorm";

import { BaseModel } from "./BaseModel";

@Entity("user")
export class User extends BaseModel {
  @Column({ name: "age", type: "integer", nullable: false })
  public age: number;

  @Column({ name: "document", type: "string", nullable: false, unique: true })
  public document: number;

  @Column({ name: "first_name", type: "varchar", nullable: true, length: 100 })
  public firstName: string | undefined;

  @Column({ name: "last_name", type: "varchar", nullable: false, length: 100 })
  public lastName: string;
}
