import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Transaction amount for the payment',
    example: 58,
  })
  transaction_amount: number;

  @ApiProperty({
    description: 'Description of the payment',
    example: 'Payment for product',
  })
  description: string;

  @ApiProperty({
    description: 'Payment method ID, e.g., master, visa, etc.',
    example: 'master',
  })
  payment_method_id: string;

  @ApiProperty({
    description: 'Payer information',
    example: {
      email: 'test_user_123@testuser.com',
      identification: {
        type: 'CPF',
        number: '95749019047',
      },
    },
  })
  payer: {
    email: string;
    identification: {
      type: string;
      number: string;
    };
  };

  @ApiProperty({
    description: 'Additional information, including items and shipping',
    example: {
      items: [
        {
          id: 'MLB2907679857',
          title: 'Point Mini',
          description: 'Point product for card payments via Bluetooth.',
          picture_url: 'https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium2x.png',
          category_id: 'electronics',
          quantity: 1,
          unit_price: 58,
        },
      ],
    },
  })
  additional_info: {
    items: {
      id: string;
      title: string;
      description: string;
      picture_url: string;
      category_id: string;
      quantity: number;
      unit_price: number;
    }[];
  };

  @ApiProperty({
    description: 'Optional Idempotency Key to avoid duplicate payments',
    example: '0d5020ed-1af6-469c-ae06-c3bec19954bb',
    required: false,
  })
  idempotency_key?: string;
}
