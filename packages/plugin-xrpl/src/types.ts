interface TransactionParams {
	address: string;
	transactionCount?: number;
	startDate?: string;
	endDate?: string;
}

interface Transaction {
	type: string;
	hash: string;
	date: string;
	amount: string;
	from: string;
	to: string;
	status: string;
}