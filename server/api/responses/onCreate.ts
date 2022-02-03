import { Response } from "express";
import HTTPStatus from "http-status";


export function onCreate(res:Response , data:any){
  res.status(HTTPStatus.CREATED).json({data:data})
}
