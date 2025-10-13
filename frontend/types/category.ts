export interface Category {
  id: string;
  name: string;
  checked: boolean;
  level: number;
  assigned: number;
  activity: number;
  available: number;
  isParent?: boolean;
  parentId?: string;
  targets: CategoryTarget[];
}
export interface CategoryTarget {
  id: string;
  categoryId: string;
  targetAmount: number;
  assignedSoFar: number;
  targetType: string;
  targetDate?: string | null;
  weeklyDays?: string[];
  monthlyDays?: number[];
  isComplete: boolean;
  createdAt: string;
  updatedAt: string;
}