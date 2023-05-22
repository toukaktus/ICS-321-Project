const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'project.db',
        driver: sqlite3.Database
    })
}
//LogIn
async function getUserID(id) {
    const db = await getDbConnection();
    let costumer1 = await db.get(`SELECT * from costumer where id = '${id}'`);
    let employee1 = await db.get(`SELECT * from employee where id = '${id}'`);
    const user = {
        costumer: costumer1,
        employee: employee1
        }
    await db.close()
    return user
}
//Report
async function paidPackagesReport() {
    const db = await getDbConnection();
    let paidPackages = await db.all(`SELECT s.*, c.id, e.costumer_type
                                FROM shipped_package s, costumer c, retail_center r , serviced_by e
                                WHERE e.package_number = s.package_number 
	                                And e.retail_id = r.retail_id
	                                And e.costumer_id = c.id
	                                AND s.paid = 1`);
    console.log(paidPackages)
    await db.close()
    return paidPackages
}

async function statusCount(date1,date2) {
    const db = await getDbConnection();
    let statusCount_ = await db.all(`SELECT package_number, status, final_delivery_date 
                                    FROM shipped_package 
                                    WHERE final_delivery_date>= '${date1}' 
                                    AND final_delivery_date<= '${date2}'`);
    await db.close()
    console.log
    return statusCount_
}

async function categoryCount(date1,date2) {
    const db = await getDbConnection();
    let categoryCount_ = await db.all(`SELECT package_number, category, final_delivery_date 
                                    FROM shipped_package 
                                    WHERE final_delivery_date>= '${date1}' 
                                    AND final_delivery_date<= '${date2}'`);
    await db.close()
    return categoryCount_
}

async function specificUserPack(id) {
    const db = await getDbConnection();
    let specificUserPack_ = await db.all(`SELECT e.package_number, e.costumer_type 
                                        from shipped_package s, serviced_by e, costumer c
                                        where e.package_number = s.package_number 
	                                        And e.costumer_id = c.id
	                                        And c.id = '${id}'`);
    await db.close()
    return specificUserPack_
}

async function findPackclassified(location, status, category) {
    const db = await getDbConnection();
    let Packclassified = await db.all(`SELECT s.package_number,s.value,s.status,s.category,l.address
                                        from shipped_package s,transportation_event t, location l
                                        WHERE s.status = '${status}' 
	                                        AND s.category = '${category}'
	                                        AND t.location_id = l.id
	                                        AND s.package_number = t.package_number
	                                        AND l.address = '${location}'`);
    await db.close()
    return Packclassified
}
//user add,edit,delete
async function addCostumer(values) {
    const db = await getDbConnection();
    let meta = await db.run(`INSERT INTO costumer VALUES ('${values.id}', '${values.email}', 
                            '${values.mobile_num}', '${values.Fname}', '${values.Lname}', '${values.password}')`);
    await db.close()
    console.log('the Costumer has been inserted.')
    return meta
}

async function addEmployee(values) {
    const db = await getDbConnection();
    let meta = await db.run(`INSERT INTO employee VALUES ('${values.id}', '${values.emp_type}', 
                           ' ${values.salary}', '${values.Fname}', '${values.Lname}', '${values.password}')`);
    await db.close()
    console.log(`the Employee has been inserted.`)
    return meta
}

async function updateCostumer(values) {
    const db = await getDbConnection();
    let meta = await db.run(`UPDATE costumer 
                            SET email= '${values.email}', mobile_num= '${values.mobile_num}',
                            Fname= '${values.Fname}', Lname= '${values.Lname}', password= '${values.password}'
                            WHERE id= '${values.id}'`);
    await db.close()
    console.log('the costumer has been updated.')
    return meta
}

async function updateEmployee(values) {
    const db = await getDbConnection();
    let meta = await db.run(`UPDATE employee 
                            SET emp_type= '${values.emp_type}', salary= '${values.salary}',
                            Fname= '${values.Fname}', Lname= '${values.Lname}', password= '${values.password}'
                            WHERE id= '${values.id}'`);
    await db.close()
    console.log('the Employee has been updated.')
    return meta
}

async function deleteCostumer(values) {
    const db = await getDbConnection();
    let meta = await db.run(`DELETE FROM costumer where id= '${values.id}';`);
    await db.close()
    console.log('the costumer has been deleted.')
    return meta
}

async function deleteEmployee(values) {
    const db = await getDbConnection();
    let meta = await db.run(`DELETE FROM employee where id= '${values.id}';`);
    await db.close()
    console.log('the employee has been deleted.')
    return meta
}

//Package
async function addPackage(values) {
    const db = await getDbConnection();
    let metaAddPack = await db.run(`INSERT INTO shipped_package VALUES('${values.package_number}', '${values.weight}', 
                            '${values.dimensions}', '${values.value}', '${values.insurance_amount}', 
                            '${values.expected_delivery_date}', '${values.final_delivery_date}',
                            '${values.status}','${values.category}', '${values.paid}')`);

    let metaAddPackSender = await db.run(`INSERT INTO serviced_by VALUES ('${values.package_number}',
                                    '${values.retail_id}','${values.sender_id}', 'sender')`);
    let metaAddPackReceiver = await db.run(`INSERT INTO serviced_by VALUES ('${values.package_number}',
                                    '${values.retail_id}','${values.receiver_id}', 'receiver')`);

    let metaAddevent = await db.run(`INSERT INTO transportation_event VALUES('${values.location_id}',
                                    '${values.package_number}', '${values.schedule_number}')`);
    let meta = {
        metaAddPack: metaAddPack,
        metaAddPackSender: metaAddPackSender,
        metaAddPackReceiver: metaAddPackReceiver,
        metaAddevent: metaAddevent
        }
    await db.close()
    console.log('the Package has been inserted.')
    return metaAddPack
}

async function updatePackage(values) {
    const db = await getDbConnection();
    let metaUpdatePack = await db.run(`UPDATE shipped_package SET weight = '${values.weight}', 
                            dimensions = '${values.dimensions}', value ='${values.value}', 
                            insurance_amount = '${values.insurance_amount}', 
                            expected_delivery_date = '${values.expected_delivery_date}', 
                            final_delivery_date = '${values.final_delivery_date}',
                            status='${values.status}',category='${values.category}', paid='${values.paid}' 
                            WHERE package_number = '${values.package_number}'`); 

    await db.close()
    console.log('the Package has been Updated.')
    return metaUpdatePack
}

async function deletePackage(values) {
    const db = await getDbConnection();
    let metaDeletePack = await db.run(`DELETE FROM shipped_package WHERE package_number= ${values.package_number}`);
    let metaDeletePackUser = await db.run(`DELETE FROM serviced_by WHERE package_number= ${values.package_number}`);
    let metaDeleteevent = await db.run(`DELETE FROM transportation_event WHERE package_number= ${values.package_number}`);
    await db.close()
    console.log('the Package has been Deleted.')
    return metadeletePack
}

//Traceback Packages
async function traceBackPackage(id) {
    const db = await getDbConnection();
    let trace = await db.all(`SELECT t.package_number,l.address, t.schedule_number, e.event_date 
                            FROM transportation_event t, event_dates e, location l
                            WHERE t.package_number= '${id}' 
                            AND l.id = t.location_id
                            AND e.schedule_number = t.schedule_number
                            ORDER BY e.event_date;`);
    await db.close()
    return trace
}

// ################### User ###################

async function specificCostumerPack(id) {
    const db = await getDbConnection();
    let specificUserPack_ = await db.all(`Select s.* 
                                        from shipped_package s, costumer c, serviced_by b
                                        where b.costumer_id = c.id
                                        AND b.package_number = s.package_number
                                        AND c.id = '${id}'`);
    await db.close()
    return specificUserPack_
}
async function updateCostumerInfo(values) {
    const db = await getDbConnection();
    let meta = await db.run(`UPDATE costumer 
                            SET email= '${values.email}', mobile_num= '${values.mobile_num}',password= '${values.password}'
                            WHERE id= '${values.id}'`);
    await db.close()
    console.log('the costumer has been updated.')
    return meta
}

async function pay(values) {
    const db = await getDbConnection();
    let meta = await db.run(`UPDATE shipped_package set paid = '1' where package_number = '${values.PackageID}'`);
    await db.close()
    console.log('the Package has been paid.')
    return meta
}

async function traceBackCostumerPack(status,id) {
    const db = await getDbConnection();
    let specificUserPack_ = await db.all(`Select s.* 
                                        from shipped_package s, costumer c, serviced_by b
                                        where b.costumer_id = c.id
                                        AND b.package_number = s.package_number
                                        AND c.id = '${id}'
                                        AND s.status = '${status}'`);
    await db.close()
    console.log(specificUserPack_)
    return specificUserPack_
}

//categoryCount()
//specificUserPack('c123456789')
module.exports = {
    getUserID, paidPackagesReport, statusCount, categoryCount, specificUserPack, findPackclassified,
    addCostumer, addEmployee, updateCostumer, updateEmployee, deleteCostumer, deleteEmployee, addPackage,
    updatePackage, deletePackage, traceBackPackage, specificCostumerPack, updateCostumerInfo, pay, traceBackCostumerPack
}
