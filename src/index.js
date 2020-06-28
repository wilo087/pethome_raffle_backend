import express from 'express';
import db from './models';

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.get('/', (req, res) => res.json({ state: 'Success' }));
app.get('/v1/winner', async (req, res) => {
  const user = await db.User.findOne({
    where: { won: 0 },
    order: [
      db.Sequelize.fn('RAND'),
    ]
  })
  return res.json(user)
});

app.listen(port, () => console.log(`App listening on port ${port}`));
