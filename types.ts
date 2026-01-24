export interface UserInput {
  topic: string;
}

export interface GenerationState {
  isGenerating: boolean;
  content: string;
  error: string | null;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
