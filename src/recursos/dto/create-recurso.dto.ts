import { IsNumber, IsString } from "class-validator"

export class CreateRecursoDto {

     @IsNumber()
     idWebServices:number
    
    @IsString()
    recursoConsumido:string

}
