import {
	BeforeInsert, BeforeUpdate, Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
	email: string;

	@Column()
	password: string;

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		if ( this.password ) {
			this.password = bcrypt.hashSync( this.password, 10 );
		}
	}
}
