import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';


export class CreateBudgetDto {
  @IsNumber()
  @Min(0)
  total: number;

  @IsOptional()
  @IsBoolean()
  initAssignedToTotal?: boolean; // optional flag
}