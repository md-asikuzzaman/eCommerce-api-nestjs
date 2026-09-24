import { IsInt, Min } from 'class-validator';

export class UpdateCartItemDto {
  @IsInt()
  @Min(0, { message: 'quantity must be greater than or equal to 0' })
  quantity!: number;
}
