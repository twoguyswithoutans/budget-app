// import { Transaction } from './Transaction';

// export class User {
//     id: string;
//     name: string;
//     email: string;
//     transactions: Transaction[];
//     expenseLimit: number;
//     categoryLimits: { [category: string]: number };

//     constructor(id: string, name: string, email: string, expenseLimit: number) {
//         this.id = id;
//         this.name = name;
//         this.email = email;
//         this.transactions = [];
//         this.expenseLimit = expenseLimit;
//         this.categoryLimits = {};
//     }

//     addTransaction(transaction: Transaction) {
//         this.transactions.push(transaction);
//     }

//     getTotalExpenses(): number {
//         return this.transactions
//             .filter(transaction => transaction.type === 'Expense')
//             .reduce((total, transaction) => total + transaction.amount, 0);
//     }

//     isExpenseLimitReached(): boolean {
//         return this.getTotalExpenses() >= this.expenseLimit;
//     }

//     setCategoryLimit(category: string, limit: number) {
//         this.categoryLimits[category] = limit;
//     }

//     getCategoryExpenses(category: string): number {
//         return this.transactions
//             .filter(transaction => transaction.type === 'Expense' && transaction.category === category)
//             .reduce((total, transaction) => total + transaction.amount, 0);
//     }

//     isCategoryLimitReached(category: string): boolean {
//         return this.getCategoryExpenses(category) >= (this.categoryLimits[category] || 0);
//     }
// }