import { ApiProperty } from '@nestjs/swagger';

export class UpdatePaymentDto {
  @ApiProperty({
    description: 'Whether the payment is captured or not',
    example: true,
  })
  capture: boolean;

  @ApiProperty({
    description: 'Status of the payment',
    example: 'cancelled',
  })
  status: string;

  @ApiProperty({
    description: 'The total transaction amount to be updated',
    example: 58.8,
  })
  transaction_amount: number;

  @ApiProperty({
    description:
      "Expiration date of the payment. The valid format is 'yyyy-MM-dd'T'HH:mm:ssz'. For example: 2022-11-17T09:37:52.000-04:00.",
    example: '2022-11-17T09:37:52.000-04:00',
  })
  date_of_expiration: string;
}
