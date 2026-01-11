
export interface ChartItem {
  label: string;
  value: number;
  secondaryValue?: number;
  unit?: string;
}

export interface SectionContent {
  type: 'text' | 'list' | 'table' | 'chart';
  data: string | string[] | { label: string; value: string | number; secondaryValue?: string | number }[] | ChartItem[];
  chartType?: 'bar' | 'grouped-bar';
}

export interface SlideData {
  id: number;
  type: 'cover' | 'content';
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  sections?: {
    heading?: string;
    content: string | string[] | { label: string; value: string | number; secondaryValue?: string | number }[] | ChartItem[] | SectionContent;
  }[];
  imageUrl?: string;
  generatedImageUrl?: string;
}
