import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';

@Injectable()
export class PaymentsService {
  private readonly API_URL = 'https://api.mercadopago.com/v1';

  // GET payment by ID
  async getPaymentById(id: string, token: string) {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false, // Disable SSL validation if needed
    });

    try {
      const response = await axios.get(`${this.API_URL}/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Use the extracted token
        },
        httpsAgent, // Optional: SSL certificate bypass
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

  // POST to create a new payment
  async createPayment(paymentData: any, token: string) {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false, // Disable SSL validation if needed
    });

    try {
      const response = await axios.post(
        `${this.API_URL}/payments`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token extracted from the header
            'Content-Type': 'application/json',
            'X-Idempotency-Key': paymentData['idempotency_key'], // Optional: Idempotency Key
          },
          httpsAgent, // Optional: SSL certificate bypass
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
}
