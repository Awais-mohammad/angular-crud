export interface Page<T> {
  index: number;
  total: number;
  items: Array<T>;
}
