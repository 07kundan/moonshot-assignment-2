interface DataItem {
  name: string;
  value: number;
}

interface RawDataItem {
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

interface CategoryInterface {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
}

interface DataInterface {
  data: RawDataItem[];
}

interface dateRange {
  startDate: string | null;
  endDate: string | null;
}

interface CategoryChart {
  date: string;
  value: number;
}

interface CategoryChartData {
  data: CategoryChart[];
}
