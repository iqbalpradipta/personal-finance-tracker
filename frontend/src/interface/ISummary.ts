interface SummaryData {
  income: number;
  expenses: number;
  balance: number;
}

interface SummaryCardProps {
  summary: SummaryData | null;
}