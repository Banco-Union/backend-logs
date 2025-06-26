import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateRecursoDto {

    @ApiProperty()
     @IsNumber()
     idWebServices:number
    
     @ApiProperty()
    @IsString()
    recursoConsumido:string

}
