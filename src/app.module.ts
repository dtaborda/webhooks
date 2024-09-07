import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookController } from './webhook/webhook.controller';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { PaymentsService } from './payments/payments.service';
import { PaymentsController } from './payments/payments.controller';

@Module({
  imports: [ConfigModule],
  controllers: [AppController, WebhookController, PaymentsController],
  providers: [AppService, ConfigService, PaymentsService],
})
export class AppModule {}
