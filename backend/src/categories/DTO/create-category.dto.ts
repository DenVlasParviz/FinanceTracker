export class CreateCategoryTargetDto {
  categoryId: string;
  targetAmount: number;
  targetType: 'weekly' | 'monthly' | 'yearly';
  targetDate?: string; // формат YYYY-MM-DD для monthly/yearly
  weeklyDays?: string[]; // для weekly
  monthlyDays?: number[]; // для monthly
}