const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/accounts', async (req, res) => {
    const input = req.query.input;
    console.log(input);
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


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
