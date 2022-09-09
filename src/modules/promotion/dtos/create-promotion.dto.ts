export class CreatePromotionDto {
    readonly name: string;
    readonly description: string;
    readonly promotionCategoryId: string;
    readonly imageUrlList: string[];
}
