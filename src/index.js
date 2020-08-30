import express from 'express';
import cors from 'cors'
import db from './models';

const app = express();
const port = process.env.SERVER_PORT || 3001;

app.use(cors())
app.get('/', (req, res) => res.json({ state: 'Success' }));
app.get('/api', async (req, res) => {
  const user = await db.User.findOne({
    where: { won: 0 },
    order: [
      db.Sequelize.fn('RAND'),
    ]
  })
  return res.json(user)
});

app.listen(port, () => console.log(`App listening on port ${port}`));
