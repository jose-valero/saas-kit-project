export type PersonSchema = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: 'single' | 'complicated' | 'married';
  progress: number;
  createdAt: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
};
