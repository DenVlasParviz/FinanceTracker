export class CreateCategoryTargetDto {
  id: string;
  categoryId: string;
  targetAmount: number;
  assignedSoFar: number;
  targetType: string;
  targetDate: string | null;
  weeklyDays?: string[];
  monthlyDays?: number[];
  isComplete: boolean;
  createdAt: string;
  updatedAt: string;
}