import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm'

@Entity()
@Tree('materialized-path')
export default class Category {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @TreeChildren({
    cascade: true,
  })
  children: Category[]

  @TreeParent({
    onDelete: 'CASCADE',
  })
  parent: Category
}
