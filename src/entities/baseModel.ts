import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * Base model entity. It has the common columns used by the other entities.
 */
export class BaseModel extends BaseEntity {

  /**
   * Created at column, it is an auto generated column.
   */
  @CreateDateColumn({ name: "created_at" })
  public createdAt: Date;

  /**
   * Primary key column.
   */
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id: string;

  /**
   * Updated at column, it is an auto generated column.
   */
  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt: Date;
}
