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
}
