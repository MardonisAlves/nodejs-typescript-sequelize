import {Request, Response, RequestHandler, ErrorRequestHandler, NextFunction} from 'express';
import * as HttpStatus from 'http-status';
import  jwt from 'jwt-simple';
import bcrypt from 'bcrypt';


class Handlers{

	authFail(req:Request, res:Response){
		res.sendStatus(HttpStatus.UNAUTHORIZED);
	}
	authSuccess(res: Response, credentials:any, data: any){
		const isMatch = bcrypt.compareSync(credentials.password , data.password);

		if(isMatch){
			const payload = {id:data.id};
			res.json({token: jwt.encode(payload, 'S3cr3t')})
		}else{
			res.sendStatus(HttpStatus.UNAUTHORIZED)
		}

	}

	onError(res:Response , message:string , err:any){
  		res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message})
	}

	onSuccess(res:Response , data:any){
  		res.status(HttpStatus.OK).json({data})
	}

	onCreate(res:Response , data:any){
  		res.status(HttpStatus.CREATED).json({data:data})
	}

 	errorHandlerApi(err:ErrorRequestHandler, req:Request, res:Response , next:NextFunction){
		console.error(`Api error handler foi executado? ${err}`);
		res.status(500).json({
    		errorCode: 'ERR-001',
    		message: 'Error interno no servidor'
		})
	}

	dbErrorHandlers(res:Response , message:string){
	  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
	   	cod:'Err-001',
	    message:'Erro ao criar usuário'
	  })
	}

}

export default new Handlers();




