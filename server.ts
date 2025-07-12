import express from 'express';
import cors from 'cors';
import { generatePeople } from './scripts/generateData';
import { PersonSchema } from './src/data.types';

const app = express();
app.use(cors());

/** GET /people
 * regresa: [items, { pagination: { total, total_count } }]
 * query: page, per_page
 */
const ALL_PEOPLE: PersonSchema[] = generatePeople(1000);
app.get('/people', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const perPage = Number(req.query.per_page as string) || 10;
  const sortBy = String(req.query.sortBy || '');

  // si viene 'desc' lo convertimos a -1, si no a +1
  const direction = req.query.order === 'desc' ? -1 : 1;

  const sorted = ALL_PEOPLE.slice().sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1 * direction;
    if (a[sortBy] > b[sortBy]) return 1 * direction;
    return 0;
  });

  /** los indices para calcular inicio y fiun */
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pageData = sorted.slice(start, end);
  const totalCount = ALL_PEOPLE.length;

  res.json([pageData, { pagination: { total: pageData.length, total_count: totalCount } }]);
});

/** levantamos el server */
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
