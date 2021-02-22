export interface DisciplinesListItem {
    name: string;
    id: number;
    description?: string;
    notes?: string;
    teacher: string;
    bibliography?: string;
    room?: string;
    schedule: any[];
  }