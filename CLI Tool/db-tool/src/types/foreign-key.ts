export interface ForeignKey {
  table: string;

  column: string;

  referencedTable: string;

  referencedColumn: string;
}
