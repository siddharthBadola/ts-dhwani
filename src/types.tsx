import { CancelTokenSource } from "axios";

export interface TableData {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface Datasets {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

export interface ChartData {
  labels: string[];
  datasets: Datasets[];
}

export interface Props {
  setId: (id: number | null) => void;
  setToken: (token: CancelTokenSource) => void;
}
