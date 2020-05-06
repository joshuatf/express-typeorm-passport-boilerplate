import * as passport from 'passport';
import * as bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import User from './entity/User';

const LocalStrategy = require( 'passport-local' ).Strategy;
const JWTStrategy = require( 'passport-jwt' ).Strategy;

passport.use( new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
	},
	async ( email, password, done ) => {
		const userRepository = getRepository( User );
		const user = await userRepository.findOne( { email } );

		if ( !user ) {
			return done( null, false, { error: 'No user found with that email.' } );
		}

		const passwordsMatch = await bcrypt.compare( password, user.password );

		if ( passwordsMatch ) {
			return done( null, user );
		}
		return done( null, false, { error: 'Incorrect Username / Password' } );
	},
) );

passport.use( new JWTStrategy( {
	jwtFromRequest: ( req ) => req.cookies.jwt,
	secretOrKey: process.env.JWT_SECRET,
},
async ( jwtPayload, done ) => {
	if ( Date.now() / 1000 > jwtPayload.exp ) {
		return done( 'JWT expired' );
	}

	if ( !jwtPayload.user || !jwtPayload.user.id ) {
		return done( 'Invalid token' );
	}

	const userRepository = getRepository( User );
	const user = await userRepository.findOne( jwtPayload.user.id );

	if ( !user ) {
		return done( 'No user found with that ID.' );
	}

	return done( null, jwtPayload.user );
} ) );
