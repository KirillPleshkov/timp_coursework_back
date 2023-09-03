import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  activeSubstance: string;

  @Column()
  maker: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
