import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecursoDto } from './dto/create-recurso.dto';
import { UpdateRecursoDto } from './dto/update-recurso.dto';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class RecursosService {

  async create(createRecursoDto: CreateRecursoDto): Promise<string> {
    const { idWebServices, recursoConsumido } = createRecursoDto;
  
    try {
      const token = await this.GetToken();
      const tokenWithoutQuotes = token.replace(/^"|"$/g, ''); // más seguro que slice
  
      const data = {
        accion: 'I',
        idWebServices,
        recursoConsumido
      };
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.BASEURL}gestion/webServices/recursos`,
        headers: {
          'Authorization': tokenWithoutQuotes,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      };
  
     
  
      const response = await axios.request(config);
      return response.data;
  
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Error desconocido';
      console.error('Error en create():', message);
      throw new HttpException(`Hubo un error: ${message}`, HttpStatus.BAD_REQUEST);
    }
  }

 async findAll() {

    try {
      const token = await this.GetToken();
      const tokenWithoutQuotes = token.replace(/^"|"$/g, ''); // más seguro que slice
  
      const data = {
        accion: 'L'
      };
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.BASEURL}gestion/webServices/recursos`,
        headers: {
          'Authorization': tokenWithoutQuotes,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      };
  
     
  
      const response = await axios.request(config);
      return response.data;
  
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Error desconocido';
      console.error('Error en create():', message);
      throw new HttpException(`Hubo un error: ${message}`, HttpStatus.BAD_REQUEST);
    }

  }

  async findOne(id: number) {

    try {
      const token = await this.GetToken();
      const tokenWithoutQuotes = token.replace(/^"|"$/g, ''); // más seguro que slice
  
      const data = {
        accion: 'F',
        id : id
      };
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.BASEURL}gestion/webServices/recursos`,
        headers: {
          'Authorization': tokenWithoutQuotes,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      };
  
     
  
      const response = await axios.request(config);
      return response.data;
  
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Error desconocido';
      console.error('Error en create():', message);
      throw new HttpException(`Hubo un error: ${message}`, HttpStatus.BAD_REQUEST);
    }

  }

  async update(id: number, updateRecursoDto: UpdateRecursoDto) {

    const { idWebServices, recursoConsumido } = updateRecursoDto;
  
    try {
      const token = await this.GetToken();
      const tokenWithoutQuotes = token.replace(/^"|"$/g, ''); // más seguro que slice
  
      const data = {
        accion: 'A',
        recursoConsumido,
        id: id,
        idWebServices
      };
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.BASEURL}gestion/webServices/recursos`,
        headers: {
          'Authorization': tokenWithoutQuotes,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      };
  
     
  
      const response = await axios.request(config);
      return response.data;
  
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Error desconocido';
      console.error('Error en create():', message);
      throw new HttpException(`Hubo un error: ${message}`, HttpStatus.BAD_REQUEST);
    }

  }

 async remove(id: number) {

  try {
    const token = await this.GetToken();
    const tokenWithoutQuotes = token.replace(/^"|"$/g, ''); // más seguro que slice

    const data = {
      accion: 'E',
      id : id
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.BASEURL}gestion/webServices/recursos`,
      headers: {
        'Authorization': tokenWithoutQuotes,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    };

   

    const response = await axios.request(config);
    return response.data;

  } catch (error) {
    const message = error?.response?.data?.message || error?.message || 'Error desconocido';
    console.error('Error en create():', message);
    throw new HttpException(`Hubo un error: ${message}`, HttpStatus.BAD_REQUEST);
  }
    
  }


  async  GetToken(): Promise<string> {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url:process.env.URLTOKEN,
      headers: {}
    };
  
    return axios.request(config).then((response: AxiosResponse) => {      
        return JSON.stringify(response.data);
      }).catch((error) => {
        throw error;
      });
  } 

}
