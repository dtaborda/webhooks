import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('webhook')
export class WebhookController {
  @Post()
  @HttpCode(HttpStatus.OK) // Asegura que siempre responda con HTTP 200
  handleWebhook(@Body() body: any, @Res() res: Response) {
    console.log('Webhook recibido:', body);

    // Implementa aquí la lógica para manejar diferentes tipos de webhooks
    if (body.type === 'subscription_preapproval') {
      console.log('Manejando preaprobación de suscripción:', body.data);
      res.status(HttpStatus.OK).send('Webhook procesado correctamente');
    } else {
      res.status(HttpStatus.BAD_REQUEST).send('Tipo de webhook no soportado');
    }
  }
}
