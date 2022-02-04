import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import User from './modules/User/services';

export default function AuthConfig(){


let ops:any = {
	secretOrKey: 'S3cr3t',
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT')
}

passport.use(new Strategy(ops, function (jwtPayload:any, done){
	User
	.getById(jwtPayload.id)
	.then(user => {
		if(user){
			return done(null, {
				id:user.id,
				email:user.email
			})
		}
	return done(null, false)
	})
	.catch((err: any) => {
		done(err, null)
	})
}))

	return {
		initialize: () => {
			return passport.initialize();
		},
		authenticate: () => {
			return passport.authenticate('jwt', {session:false});
		}
	}
}
