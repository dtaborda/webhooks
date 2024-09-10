import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthToken } from '../auth/auth.decorator';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@ApiTags('payments')
@Controller('payments')
@ApiBearerAuth('access-token')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve payment by ID' })
  async getPaymentById(@Param('id') id: string, @AuthToken() token: string) {
    return this.paymentsService.getPaymentById(id, token);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  async createPayment(
    @Body() paymentData: CreatePaymentDto,
    @AuthToken() token: string,
  ) {
    return this.paymentsService.createPayment(paymentData, token);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update payment by ID' })
  async updatePayment(
    @Param('id') id: string,
    @Body() updateData: UpdatePaymentDto,
    @AuthToken() token: string,
  ) {
    return this.paymentsService.updatePayment(id, updateData, token);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search for payments' })
  async searchPayments(@Query() queryParams: any, @AuthToken() token: string) {
    return this.paymentsService.searchPayments(queryParams, token);
  }
}
