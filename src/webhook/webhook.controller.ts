import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  @Post()
  @HttpCode(HttpStatus.OK)
  handleWebhook(@Body() body: any): string {
    console.log('Webhook received:', body);
    // Aquí puedes procesar el cuerpo del webhook según sea necesario
    return 'Webhook processed successfully';
  }
}
