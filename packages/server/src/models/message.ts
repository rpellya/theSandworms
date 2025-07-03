import {
	Table,
	Column,
	Model,
	PrimaryKey,
	ForeignKey,
	BelongsTo,
	DataType,
	CreatedAt,
	UpdatedAt,
} from 'sequelize-typescript';
import { Topic } from './topic';
import { User } from './user';

@Table({ tableName: 'messages' })
export class Message extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
	override id!: string;

	@ForeignKey(() => Topic)
	@Column({ type: DataType.UUID, allowNull: false })
	topicId!: string;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER, allowNull: false })
	userId!: string;

	@Column({ type: DataType.TEXT, allowNull: false })
	message!: string;

	@BelongsTo(() => Topic)
	topic!: Topic;

	@BelongsTo(() => User)
	user!: User;

	@CreatedAt
	@Column({ field: 'created_at' })
	override createdAt!: Date;

	@UpdatedAt
	@Column({ field: 'updated_at' })
	override updatedAt!: Date;
}
