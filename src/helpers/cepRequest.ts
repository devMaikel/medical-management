import { CreateDoctorDto } from '../doctor/dto/create-doctor.dto';
import { ICepReturn } from 'src/interfaces';
import axios from 'axios';

export class cepRequest {
  async getAddress(doctor: CreateDoctorDto): Promise<CreateDoctorDto | string> {
    try {
      const { data } = (await axios(
        `https://viacep.com.br/ws/${doctor.cep.toString()}/json/`,
      )) as ICepReturn;
      doctor.city = data.localidade;
      doctor.district = data.bairro;
      doctor.public_place = data.logradouro;
      doctor.state = data.uf;
      if (doctor.city) {
        return doctor; //retornar doctor com cep preenchido em caso de sucesso na requisição com dados corretos
      }
      return 'error'; //retornar doctor com cep preenchido em caso de sucesso na requisição com dados nulos
    } catch (err) {
      return 'error'; //retornar 'error' em caso de falha na requisição
    }
  }
}
