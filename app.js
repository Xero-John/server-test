const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/accounts', async (req, res) => {
    const hello = await prisma.accounts.findMany();
    res.json(hello);
})

app.get('/', async (req, res) => {
    const hello = await prisma.employees.findMany();
    res.json({
        message: 'Employees API!',
        "employees": hello
    });
})

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello!',
//   })
// })
// app.get('/account', (req, res) => {
//   res.json({
//     message: 'account!',
//   })
// })
// app.get('/thanks', (req, res) => {
//   res.json({
//     message: 'thanks!',
//   })
// })

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
