export class PostgresError extends Error {
  code: string;
  detail?: string;
  table?: string;
  constraint?: string;
}
