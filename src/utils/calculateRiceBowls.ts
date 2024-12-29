export const BOWLS_PER_DAY = 3;
export const DAYS_PER_YEAR = 365;

export function calculateRiceBowls(birthDate: Date): number {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - birthDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays * BOWLS_PER_DAY;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num);
}