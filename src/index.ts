import bodyParser from 'body-parser'
import { AppDataSource } from './data-source'
import Category from './entity/Category'
import Express, { Application, Request, Response } from 'express'
import { User } from './entity/User'

AppDataSource.initialize()
  .then(async () => {
    console.log('connected')
  })
  .catch((error) => console.log(error))

const app: Application = Express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/create', async (req: Request, res: Response) => {
  try {
    const categoryRepository = AppDataSource.manager.getTreeRepository(Category)

    const cateparent1 = new Category()
    cateparent1.name = 'cate parent 1'
    await categoryRepository.save(cateparent1)

    const cateparent2 = new Category()
    cateparent2.name = 'cate parent 2'
    await categoryRepository.save(cateparent2)

    const catechild1 = new Category()
    catechild1.name = 'cate child 1'
    catechild1.parent = cateparent1
    await categoryRepository.save(catechild1)

    const catechild2 = new Category()
    catechild2.name = 'cate child 2'
    catechild2.parent = cateparent1
    await categoryRepository.save(catechild2)

    const catechild3 = new Category()
    catechild3.name = 'cate child 3'
    catechild3.parent = catechild1
    await categoryRepository.save(catechild3)

    return res.send('ok')
  } catch (error) {
    console.log(error)
    return res.send('fail')
  }
})

app.get('/', async (req: Request, res: Response) => {
  try {
    const categoryRepository = AppDataSource.getTreeRepository(Category)

    const categories = await categoryRepository.findTrees()

    console.log(categories)

    return res.json({ categories })
  } catch (error) {
    console.log(error)

    return res.send('fail')
  }
})

app.get('/delete/:id', async (req: Request, res: Response) => {
  try {
    const categoryRepository = AppDataSource.getTreeRepository(Category)

    const category = await categoryRepository.findOneBy({ id: req.params.id })

    if (category) {
      const response = await categoryRepository.remove(category)

      return res.json({
        response,
      })
    }
    return res.send('not found')
  } catch (error) {
    console.log(error)

    return res.send('fail')
  }
})

////

app.post('/user', async (req: Request, res: Response) => {
  const userRepository = AppDataSource.manager.getRepository(User)
  try {
    const user = new User()
    user.name = req.body.name

    const response = await userRepository.save(user)

    return res.json({
      response,
    })
  } catch (error) {
    console.log(error)

    return res.send('fail')
  }
})

app.listen(3002)
