export interface TaskItem {
  id: string;
  title: string;
  summary: string;
  status: 'pending' | 'generating' | 'reviewing' | 'done';
}
