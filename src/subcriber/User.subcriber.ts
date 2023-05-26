import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm'
import { User } from '../entity/User'

@EventSubscriber()
export default class UserSubcriber implements EntitySubscriberInterface<User> {
  listenTo(): string | Function {
    return User
  }

  beforeInsert(event: InsertEvent<User>): void | Promise<any> {
    event.entity.name = 'khong phai'
  }
}
