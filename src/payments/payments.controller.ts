import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
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
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Sorting criteria',
    example: 'date_created',
  })
  @ApiQuery({
    name: 'criteria',
    required: false,
    description: 'Sort order',
    example: 'desc',
  })
  @ApiQuery({
    name: 'external_reference',
    required: false,
    description: 'External payment reference',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Payment status',
    example: 'approved',
  })
  @ApiQuery({
    name: 'range',
    required: false,
    description: 'Range to search for',
    example: 'date_created',
  })
  @ApiQuery({
    name: 'begin_date',
    required: false,
    description: 'Start date for the search',
    example: 'NOW-30DAYS',
  })
  @ApiQuery({
    name: 'end_date',
    required: false,
    description: 'End date for the search',
    example: 'NOW',
  })
  @ApiQuery({
    name: 'store_id',
    required: false,
    description: 'Store ID for filtering',
  })
  @ApiQuery({
    name: 'pos_id',
    required: false,
    description: 'POS ID for filtering',
  })
  @ApiQuery({
    name: 'collector.id',
    required: false,
    description: 'Collector ID',
  })
  @ApiQuery({ name: 'payer.id', required: false, description: 'Payer ID' })
  async searchPayments(@Query() queryParams: any, @AuthToken() token: string) {
    return this.paymentsService.searchPayments(queryParams, token);
  }
}
