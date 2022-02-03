import { Response } from "express";
import HTTPStatus from "http-status";


export function onSuccess(res:Response , data:any){
  res.status(HTTPStatus.OK).json({data})
}
