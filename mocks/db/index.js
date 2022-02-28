import { factory, primaryKey } from '@mswjs/data'

export const db = factory({
  users: {
    id: primaryKey(() => '1'),
    firstName: () => 'John',
    lastName: () => 'Maverick',
  },
})

db.users.create({})

console.log(db.users.findFirst({
  where:{
    id: {
      equals: '1',
    }
  }
}))
