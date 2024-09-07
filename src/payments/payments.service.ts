import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '../config/config.service';
import * as https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

@Injectable()
export class PaymentsService {
  private readonly API_URL = 'https://api.mercadopago.com/v1';

  constructor(private readonly configService: ConfigService) {}

  async getPaymentById(id: string) {
    const token = this.configService.get('MP_ACCESS_TOKEN');

    console.log({ token, id });
    try {
      const response = await axios.get(`${this.API_URL}/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        httpsAgent: agent,
      });
      console.log({ response });
      return response.data;
    } catch (error) {
      console.log({ error });

      throw new HttpException(
        error.response?.data || 'Error fetching payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
