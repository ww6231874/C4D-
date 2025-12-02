export interface Color {
  hex: string;
  name?: string;
}

export interface Palette {
  id: string;
  name: string;
  colors: string[]; // Array of hex strings
  likes: number;
  tags: string[];
}

export enum C4DMaterialType {
  STANDARD = 'Standard',
  REDSHIFT = 'Redshift',
}

export interface ScriptConfig {
  materialType: C4DMaterialType;
  createLayer: boolean;
  prefix: string;
}

export type Language = 'zh' | 'en';
export type Theme = 'light' | 'dark';
