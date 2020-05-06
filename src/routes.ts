import * as passport from 'passport';
import AuthController from './controller/AuthController';
import './passport';

const Routes = [{
	method: 'post',
	route: '/auth/register',
	controller: AuthController,
	action: 'register',
}, {
	method: 'post',
	route: '/auth/login',
	controller: AuthController,
	middleware: passport.authenticate( 'local', { session: false } ),
	action: 'login',
}, {
	method: 'post',
	route: '/auth/logout',
	controller: AuthController,
	middleware: passport.authenticate( 'jwt', { session: false } ),
	action: 'logout',
}, {
	method: 'get',
	route: '/auth/check',
	controller: AuthController,
	middleware: passport.authenticate( 'jwt', { session: false } ),
	action: 'check',
}];

export default Routes;
