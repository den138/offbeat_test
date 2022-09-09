export class CreatePromotionCategoryDto {
    readonly name: string;
    readonly parentPromotionCategoryId?: string;
    readonly subCategoryCount: number;
}
