import { factory, primaryKey } from '@mswjs/data'
import faker from '@faker-js/faker'

export const db = factory({
  users: {
    id: primaryKey(faker.datatype.uuid),
    name: String
  },
  authentications: {
    id: primaryKey(faker.datatype.uuid),
    username: String,
    password: String,
    userId: String
  }
})

const johnUser = db.users.create({
  name: "John Due"
})

db.authentications.create({
  username: "john",
  password: "password",
  userId: johnUser.id
})
