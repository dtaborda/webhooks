import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthToken } from '../auth/auth.decorator'; // Import the custom decorator

@ApiTags('payments')
@Controller('payments')
@ApiBearerAuth('access-token') // Enable Swagger Bearer Token authentication
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // GET by ID (already implemented)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve payment by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Payment ID' })
  @ApiResponse({ status: 200, description: 'Payment successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  async getPaymentById(@Param('id') id: string, @AuthToken() token: string) {
    return this.paymentsService.getPaymentById(id, token);
  }

  // POST to create a new payment
  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'Payment successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createPayment(@Body() paymentData: any, @AuthToken() token: string) {
    return this.paymentsService.createPayment(paymentData, token);
  }
}
