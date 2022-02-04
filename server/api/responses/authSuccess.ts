import { Request, Response} from 'express';
import  jwt from 'jwt-simple';
import * as HttpStatus from 'http-status';


export default function authSuccess(res: Response, credentials:any, data: any){
const isMatch = (credentials.password) == data.password;
if(isMatch){
	const payload = {id:data.id};
	res.json({token: jwt.encode(payload, 'S3cr3t')})
}else{
	res.sendStatus(HttpStatus.UNAUTHORIZED)
}
}