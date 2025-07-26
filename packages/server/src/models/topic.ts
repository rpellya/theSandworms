import {
	Column,
	Model,
	PrimaryKey,
	Table,
	UpdatedAt,
	DataType,
	HasMany,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';
import { Message } from './message';
import { User } from './user';

@Table({ tableName: 'topics' })
export class Topic extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
	override id!: string;

	@Column({ allowNull: false })
	title!: string;

	@Column
	description?: string;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER, allowNull: false })
	userId!: string;

	@BelongsTo(() => User)
	user!: User;

	@HasMany(() => Message)
	messages!: Message[];

	@Column({ field: 'created_at' })
	override createdAt!: Date;

	@UpdatedAt
	@Column({ field: 'updated_at' })
	override updatedAt!: Date;
}
