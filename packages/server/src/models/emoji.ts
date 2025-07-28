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
import { Message } from './message';

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

	@ForeignKey(() => Message)
	@Column({ type: DataType.STRING, allowNull: false })
	messageId!: string;

	@BelongsTo(() => User)
	user!: User;

	@CreatedAt
	@Column({ field: 'created_at' })
	override createdAt!: Date;

	@UpdatedAt
	@Column({ field: 'updated_at' })
	override updatedAt!: Date;
}
