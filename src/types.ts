export interface Essay {
  id: number;
  tier: string;
  prompt: string;
  content: string;
}

export type Tier = 'All' | 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Tier 4' | 'Tier 5' | 'Tier 6';
