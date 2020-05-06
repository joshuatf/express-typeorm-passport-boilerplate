import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../entity/User';

export default class AuthController {
	private userRepository = getRepository( User );

	async login( request: Request, response: Response ) {
		const { user } = request;

		const token = jwt.sign( { user }, process.env.JWT_SECRET, {
			expiresIn: '14400m',
		} );

		response.cookie( 'jwt', token );
		return { data: { user } };
	}

	async logout( request: Request, response: Response ) {
		response.clearCookie( 'jwt' );
		return { data: {} };
	}

	async register( request: Request ) {
		const userEntity = this.userRepository.create( request.body );
		const user = await this.userRepository.save( userEntity );
		return { data: { user } };
	}

	async check( request: Request, response: Response ) {
		const { user } = request;
		const token = jwt.sign( { user }, process.env.JWT_SECRET, { expiresIn: '14400m' } );
		response.cookie( 'jwt', token );
		return { data: { user } };
	}
}
