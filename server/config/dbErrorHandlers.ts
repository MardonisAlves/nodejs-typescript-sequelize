import { Response } from "express";
import HTTPStatus from "http-status";


export function dbErrorHandlers(res:Response , message:string , err:any){
  console.log(`Error: ${err}`)
  res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
    cod:'Err-001',
    message:'Erro ao criar usuário'
  })
}
