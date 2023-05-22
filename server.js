const express = require('express')
const nunjucks = require('nunjucks');
const app = express()
const port = 3500

const model = require('./models/model')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
nunjucks.configure('views', { express: app });


// Login backend
app.get('/', async (req, res) => await res.render('Log_in.html'))

    
app.post('/',async (req, res) => {
    const matchUser = await model.getUserID(req.body.username)
    try { 
        if (matchUser.costumer) {
            const matchPassword = (req.body.password === matchUser.costumer.password)
            if (!matchUser || !matchPassword)
                throw 'Invalid Credentials'
            res.redirect(`/User/${req.body.username}`)
        }
        else if (matchUser.employee) {
            const matchPassword = (req.body.password === matchUser.employee.password)
            if (!matchUser || !matchPassword)
                throw 'Invalid Credentials'
            res.redirect('/Admin')
        }
        else {
            throw 'Invalid Credentials'
        }
    }
    catch (e) {
        //window.alert("Invalid Credentials")
        res.render('Log_in.html', {
           username: req.body.username,
          mode: "invalid Credentials"
        })
    }
            
})
           
// Admin backend
app.get('/Admin', async (req, res) => {
    model.getUserID().then(values => {
        res.render('Admin.html', { values: values })
    })
    
})

app.post('/Admin', async (req, res) => {
    model.getUserID().then(values => {
        res.render('Admin.html', { values: values })
    })
})

// edit package
app.post('/Admin/addPackage', async (req, res) => {
    await res.send(JSON.stringify(await model.addPackage(req.body)));
})
app.post('/Admin/updatePackage', async (req, res) => {
    await res.send(JSON.stringify(await model.updatePackage(req.body)));
})
app.post('/Admin/deletePackage', async (req, res) => {
    await res.send(JSON.stringify(await model.deletePackage(req.body)));
})
// edit user
app.post('/Admin/addCostumer', async (req, res) => {
    await res.send(JSON.stringify(await model.addCostumer(req.body)));
})
app.post('/Admin/addEmployee', async (req, res) => {
    await res.send(JSON.stringify(await model.addEmployee(req.body)));
})
app.post('/Admin/updateCostumer', async (req, res) => {
    await res.send(JSON.stringify(await model.updateCostumer(req.body)));
})
app.post('/Admin/updateEmployee', async (req, res) => {
    await res.send(JSON.stringify(await model.updateEmployee(req.body)));
})
app.post('/Admin/deleteCostumer', async (req, res) => {
    await res.send(JSON.stringify(await model.deleteCostumer(req.body)));
})
app.post('/Admin/deleteEmployee', async (req, res) => {
    await res.send(JSON.stringify(await model.deleteEmployee(req.body)));
})

//reports
app.get('/Admin/paidPackagesReport', async (req, res) => {
    res.send(JSON.stringify(await model.paidPackagesReport()))
})

app.get('/Admin/statusCount/:date1/:date2', async (req, res) => {
    res.send(JSON.stringify(await model.statusCount(req.params.date1, req.params.date2)))
})

app.get('/Admin/categoryCount/:date1/:date2', async (req, res) => {
    res.send(JSON.stringify(await model.categoryCount(req.params.date1, req.params.date2)))
})

app.get('/Admin/specificUserPack,:ID', async (req, res) => {
    res.send(JSON.stringify(await model.specificUserPack(req.params.ID)))
})

app.get('/Admin/classPackage/:location/:status/:category', async (req, res) => {
    res.send(JSON.stringify(await model.findPackclassified(req.params.location, req.params.status, req.params.category)))
})

app.post('/Admin/specificUserPack', async (req, res) => {
    //res.send(JSON.stringify(await model.specificUserPack(req.body)))
    model.specificUserPack(req.body).then(specificUserPack_ => {
        res.render('Admin.html', { specificUserPack_: specificUserPack_ })
    })
})
//TraceBack
app.get('/Admin/traceBackPackage/:ID', async (req, res) => {
    res.send(JSON.stringify(await model.traceBackPackage(req.params.ID)))
})

// ########## user ##########
app.get('/User/:ID', async (req, res) => {
    model.getUserID(req.params.ID).then(values => {
        res.render('User.html', { values: values })
    })
})
app.post('/User/:ID', async (req, res) => {
    model.getUserID(req.params.ID).then(values => {
        res.render('User.html', { values: values })
    })
})

app.get('/User/:ID/getPackage', async (req, res) => {
    res.send(JSON.stringify(await model.specificCostumerPack(req.params.ID)))
})

app.get('/User/:ID/UpdateInfo', async (req, res) => {
    res.send('sent')
})
app.post('/User/:ID/UpdateInfo', async (req, res) => {
    res.send(JSON.stringify(await model.updateCostumerInfo(req.body)))
})

app.get('/User/:ID/UpdateInfo', async (req, res) => {
    res.send('sent')
})
app.post('/User/:ID/Payment', async (req, res) => {
    res.send(JSON.stringify(await model.pay(req.body)))
})

app.get('http://127.0.0.1:3000/User/UserTraceBack/:ID/:status', async (req, res) => {
    res.send(JSON.stringify(await model.traceBackCostumerPack(req.params.status,req.params.ID)))
})


// addition
app.use(function (req, res, next) {
    res.status(404).send('We cant find your page');
});

app.listen(port, () => console.log(`Example app listening on port http://127.0.0.1:${port}`))