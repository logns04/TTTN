export interface VerifyResult {
  table: string;

  expectedRows: number;

  actualRows: number;

  passed: boolean;
}
