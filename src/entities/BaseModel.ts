import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";

export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id: string;
}
