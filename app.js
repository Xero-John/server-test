const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const {PrismaClient, accounts} = require('@prisma/client');
const prisma = new PrismaClient();
const account = app.get('/accounts/:username&:password', async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    const data = await prisma.accounts.findMany({
        where: {
            username: username,
            password: password
        },
        include: {
            employees: {
                include: {
                    department: true,
                    job_class: true
                }
            }
        }
    });

    res.json(data);
    return data.map(d => d.employee_id).toString()

})

app.get('/attendance/:accountId', async (req, res) => {
    const accountId = parseInt(req.params.accountId);
    const accountWithEmployeeAndAttendance = await prisma.accounts.findUnique({
        where: {
            account_id: accountId // specify the ID of the account you want to retrieve
        },
        include: {
            employees: {
                select: {
                    picture: true,
                    rfid: true,
                    first_name: true,
                    last_name: true,
                    middle_name: true,
                    suffix: true,
                    gender: true,
                    age: true,
                    email: true,
                    phone_no: true,
                    birthdate: true,
                    working_type: true,
                    hired_date: true,
                    status_: true, // 'status' might be a reserved word, so use 'status_' or change the field name if necessary
                    isEmployed: true,
                    job_class: {
                        select: {
                            job_title: true
                        }
                    },
                    attendance: {
                        select: {
                            attendance_id: true,
                            date: true,
                            time_in: true,
                            time_out: true,
                            shift_length: true,
                            over_time: true,
                            under_time: true,
                            late_duration: true,
                            status: true
                        }
                    },
                    department: {
                        select: {
                            department_name: true
                        }
                    }
                }
            }
        }
    })

    console.log(accountWithEmployeeAndAttendance);

    res.json(accountWithEmployeeAndAttendance);

})

app.get("/", (req, res) => {

    res.json({message: "ok"});
});



app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
