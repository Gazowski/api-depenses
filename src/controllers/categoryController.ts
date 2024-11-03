
import { Request, Response } from 'express';
import { CategoryService } from '../models/Category';
import { TransactionService } from '../models/Transaction';

const categoryService = new CategoryService();
const transactionService = new TransactionService();

export const getAllCategories = async (req: Request, res: Response) => {
    const categories = await categoryService.getAllWithKeywords();
    res.json(categories);
};

export const addCategory = async (req: Request, res: Response) => {
    const { name } = req.body;
    const category = await categoryService.findOrCreate(name);
    res.json(category);
};

export const addKeyword = async (req: Request, res: Response) => {
    const { categoryName, keyword } = req.body;
    const category = await categoryService.addKeyword(categoryName, keyword.toLowerCase());
    res.json(category);
};

export const findCategoryForTransaction = async (req: Request, res: Response) => {
    const { transactionDescription } = req.body;
    const category = await categoryService.findCategoryForTransaction(transactionDescription.toLowerCase());
    res.json(category);
};

export const getTotalsByCategory = async (req: Request, res: Response) => {
    const year = req.query.year as string;
    const aggregatedData = await transactionService.aggregateTransactionsByCategory(year);
    // const formattedData = aggregatedData.reduce((acc, curr) => {
    //     const month = parseInt(curr.month);
    //     const categoryName = curr.categoryName;
    //     const total = parseFloat(curr.total);
        
    //     if (!acc[categoryName]) {
    //         acc[categoryName] = {
    //             monthlyTotals: Array(12).fill(0),
    //             yearlyTotal: 0,
    //             title: curr.categoryTitle,
    //             color: curr.categoryColor,
    //             group: curr.categoryGroup
    //         };
    //     }
        
    //     acc[categoryName].monthlyTotals[month - 1] = total;
    //     acc[categoryName].yearlyTotal += total;
        
    //     console.log(acc);
        
    //     return acc;
    // }, {} as Record<string, {
    //     monthlyTotals: number[],
    //     yearlyTotal: number,
    //     title: string,
    //     color: string,
    //     group: string
    // }>);

    res.json({ [year]: aggregatedData });
}