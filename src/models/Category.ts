import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

export class CategoryService {
    private categoryRepository = AppDataSource.getRepository(Category);

    async findOrCreate(name: string): Promise<Category> {
        let category = await this.categoryRepository.findOne({ where: { name } });
        if (!category) {
            category = this.categoryRepository.create({ name, keywords: [] });
            await this.categoryRepository.save(category);
        }
        return category;
    }

    async addKeyword(categoryName: string, keyword: string): Promise<Category> {
        const category = await this.findOrCreate(categoryName);
        if (!category.keywords.includes(keyword)) {
            category.keywords.push(keyword);
            await this.categoryRepository.save(category);
        }
        return category;
    }

    async getAllWithKeywords(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findCategoryForTransaction(transactionDescription: String): Promise<Category> {
        const categories = await this.getAllWithKeywords();
        for (const category of categories) {
            for (const keyword of category.keywords) {
                const description = transactionDescription.toLowerCase();
                if (description.includes(keyword)) {
                    return category;
                }
            }
        }
        return this.findOrCreate('unknown');
    }

}