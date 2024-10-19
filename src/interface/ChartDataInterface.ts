export interface DataItem {
  name: string;
  value: number;
}

export interface RawDataItem {
  date: string;
  age: string;
  gender: string;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
}

export interface CategoryInterface {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
}

export interface DataInterface {
  data: RawDataItem[];
}

export interface dateRange {
  startDate: string | null;
  endDate: string | null;
}

export interface CategoryChart {
  date: string;
  value: number;
}

export interface CategoryChartData {
  data: CategoryChart[];
}
