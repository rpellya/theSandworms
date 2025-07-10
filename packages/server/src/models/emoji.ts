import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	ForeignKey,
	BelongsTo,
	DataType,
	CreatedAt,
	UpdatedAt,
} from 'sequelize-typescript';
import { User } from './user';

@Table({ tableName: 'emojis' })
export class Emoji extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	override id!: number;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER, allowNull: false })
	userId!: number;

	@Column({ type: DataType.STRING, allowNull: false })
	emoji!: string;

	@BelongsTo(() => User)
	user!: User;

	@CreatedAt
	@Column({ field: 'created_at' })
	override createdAt!: Date;

	@UpdatedAt
	@Column({ field: 'updated_at' })
	override updatedAt!: Date;
}
