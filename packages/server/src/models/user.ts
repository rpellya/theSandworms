import {
	Table,
	Column,
	Model,
	PrimaryKey,
	DataType,
	CreatedAt,
	UpdatedAt,
	HasMany,
} from 'sequelize-typescript';
import { Topic } from './topic';
import { Message } from './message';

@Table({ tableName: 'users' })
export class User extends Model {
	@PrimaryKey
	@Column({ type: DataType.INTEGER, allowNull: false })
	override id!: number;

	@Column({ type: DataType.STRING, allowNull: false })
	firstName!: string;

	@Column({ type: DataType.STRING, allowNull: false })
	lastName!: string;

	@Column({ type: DataType.STRING, allowNull: true })
	avatar?: string;

	@Column({ type: DataType.STRING, allowNull: true })
	display_name?: string;

	@HasMany(() => Topic)
	topics!: Topic[];

	@HasMany(() => Message)
	messages!: Message[];

	@CreatedAt
	@Column({ field: 'created_at' })
	override createdAt!: Date;

	@UpdatedAt
	@Column({ field: 'updated_at' })
	override updatedAt!: Date;
}
