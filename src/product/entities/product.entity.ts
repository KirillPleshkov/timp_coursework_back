import { Basket } from 'src/basket/entities/basket.entity';
import { Category } from 'src/category/entities/category.entity';
import { Symptom } from 'src/symptom/entities/symptom.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column()
  indicationsForUse: string;

  @Column()
  contraindications: string;

  @Column()
  applicationMethod: string;

  @Column()
  shelfLife: string;

  @Column()
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category?: Category;

  @ManyToOne(() => Symptom, (symptom) => symptom.products)
  symptom?: Symptom;

  @OneToMany(() => Basket, (basket) => basket.product)
  baskets: Basket[];
}
