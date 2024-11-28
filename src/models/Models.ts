export type Income = {
    amount: number | bigint;
}

export type Transaction = {
    price: number;
    date: string;
    description?: string | undefined;
    category: string;
}

export type Category = {
    category: string;
    price: number;
}

export type CategoryLimit = {
    category: string;
    limit: number;
}

export type ExceededCategory = {
    category: Array<string>;
}

export enum PresetCategory {
    Food = 'Food',
    Transportation = 'Transportation',
    Utilities = 'Utilities',
    Healthcare = 'Healthcare',
    Entertainment = 'Entertainment',
    Education = 'Education',
    Miscellaneous = 'Miscellaneous'
}