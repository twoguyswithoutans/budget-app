export type Income = {
    amount: number;
}

export type Transaction = {
    price: number;
    date?: Date | undefined | string;
    description?: string | undefined;
    category: string;
}

export type Category = {
    category: string;
    amount: number;
}

export type CategoryLimit = {
    category: string;
    limit: number;
}

export type ExceededCategories = {
    category: Array<string>;
}

export enum PresetCategories {
    Food = 'Food',
    Transportation = 'Transportation',
    Utilities = 'Utilities',
    Healthcare = 'Healthcare',
    Entertainment = 'Entertainment',
    Education = 'Education',
    Miscellaneous = 'Miscellaneous'
}