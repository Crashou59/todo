import { HttpException } from '@nestjs/common'

export class TodoException extends HttpException {

    constructor({error,status}){
        super(error, status)
    }

}   