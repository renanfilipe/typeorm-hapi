import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export class BaseModel extends BaseEntity {
  @CreateDateColumn({ name: "created_at" })
  public createdAt: Date;

  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id: string;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt: Date;
}
