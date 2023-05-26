import 'reflect-metadata'
import { DataSource } from 'typeorm'
import Category from './entity/Category'
import { User } from './entity/User'
import UserSubcriber from './subcriber/User.subcriber'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'type_orm_tree_entity',
  synchronize: true,
  logging: false,
  entities: [Category, User],
  migrations: [],
  subscribers: [UserSubcriber],
})
