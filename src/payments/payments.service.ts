import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';

@Injectable()
export class PaymentsService {
  private readonly API_URL = 'https://api.mercadopago.com/v1';

  async getPaymentById(id: string, token: string) {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false, // Disable SSL validation if needed
    });

    try {
      const response = await axios.get(`${this.API_URL}/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        httpsAgent,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw new HttpException(
        error.response?.data || 'Error fetching payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createPayment(paymentData: any, token: string) {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    try {
      const response = await axios.post(
        `${this.API_URL}/payments`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-Idempotency-Key': paymentData.idempotency_key || '',
          },
          httpsAgent,
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw new HttpException(
        error.response?.data || 'Error creating payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePayment(id: string, updateData: any, token: string) {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    try {
      const response = await axios.put(
        `${this.API_URL}/payments/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          httpsAgent,
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error updating payment:', error);
      throw new HttpException(
        error.response?.data || 'Error updating payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchPayments(queryParams: any, token: string) {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    const queryString = new URLSearchParams(queryParams).toString();

    try {
      const response = await axios.get(
        `${this.API_URL}/payments/search?${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          httpsAgent,
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error searching payments:', error);
      throw new HttpException(
        error.response?.data || 'Error searching payments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
