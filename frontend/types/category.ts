export interface Category {
  id: string;
  name: string;
  checked: boolean;
  level: number;
  budgeted: number;
  activity: number;
  available: number;
  isParent?: boolean;
  parentId?: string;

}
