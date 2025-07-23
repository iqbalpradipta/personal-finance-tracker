interface Transaction {
  ID: number;
  CreatedAt: string;
  type: "Income" | "Expenses";
  amount: number;
  category: string;
  description: string;
}

interface RecentTransactionProps {
  transactions: Transaction[];
}

interface TransactionTableProps {
  transactions: Transaction[];
  currentPage: number;
  itemsPerPage: number;
  hasMore: boolean;
  onPageChange: (page: number) => void;
  onEditTransaction: (id: number) => void;
  onDeleteTransaction: (id: number) => void;
}

interface TransactionFilterProps {
  filterType: string;
  startDate: string;
  endDate: string;
  onFilterChange: (newFilters: {
    type?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
  onExportExcel: () => void;
}

interface TransactionFormData {
  type: "Income" | "Expenses" | "";
  amount: number | "";
  category: string;
  description: string;
}
