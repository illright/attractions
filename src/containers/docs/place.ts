export interface Place {
  title: string;
  segment?: string | null;
  sub?: Place[];
}
