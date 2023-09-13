export class CreateProductDto {
  readonly name: string;

  readonly imageUrl: string;

  readonly activeSubstance: string;

  readonly maker: string;

  readonly description: string;

  readonly indicationsForUse: string;

  readonly contraindications: string;

  readonly applicationMethod: string;

  readonly shelfLife: string;

  readonly categoryName: string;

  readonly symptomName: string;

  readonly price: number;
}
