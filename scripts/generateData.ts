import { faker } from '@faker-js/faker';
import { PersonSchema } from '../src/data.types';

export function generatePeople(count = 100): PersonSchema[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 80 }),
    visits: faker.number.int({ min: 0, max: 100 }),
    status: faker.helpers.arrayElement(['single', 'complicated', 'married']),
    progress: faker.number.int({ min: 0, max: 100 }),
    createdAt: faker.date.past().toISOString(),
    address: {
      street: faker.location.street(),
      city: faker.location.city(),
      zip: faker.location.zipCode()
    }
  }));
}
