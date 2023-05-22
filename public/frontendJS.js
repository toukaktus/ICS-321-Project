// Package editing
async function seeAddPackage() {
    var add = document.getElementById('addFieldP');
    var up = document.getElementById('updateFieldP');
    var del = document.getElementById('removeFieldP');

    up.style.display = "none";
    del.style.display = "none";

    if (add.style.display === "none") {
        add.style.display = "block";
    } else {
        add.style.display = "none";
    }
    
}

async function seeUpdatePackage() {
    var add = document.getElementById('addFieldP');
    var up = document.getElementById('updateFieldP');
    var del = document.getElementById('removeFieldP');

    add.style.display = "none";
    del.style.display = "none";

    if (up.style.display === "none") {
        up.style.display = "block";
    } else {
        up.style.display = "none";
    }
    
}

async function seeRemovePackage() {
    var add = document.getElementById('addFieldP');
    var up = document.getElementById('updateFieldP');
    var del = document.getElementById('removeFieldP');

    add.style.display = "none";
    up.style.display = "none";

    if (del.style.display === "none") {
        del.style.display = "block";
    } else {
        del.style.display = "none";
    } 
}

async function addValidationP(){
    let data = new FormData(document.getElementById("add_Package_form"));
    const newData = {
        package_number : data.get("Pid_add"),
        weight : data.get("Weight_add"),
        dimensions: data.get("Dimensions_add"),
        value: data.get("Value_add"),
        insurance_amount: data.get("IA_add"),
        status: data.get("Status_add"),
        expected_delivery_date: data.get("Expected_add"), 
        final_delivery_date: data.get("Final_add"),
        category:data.get("Category_add"),
        paid: data.get("Payment_add"),
        retail_id: data.get("retailID_add"),
        location_id: data.get("location_id_add"),
        schedule_number: data.get("schedule_number_add"),
        receiver_id: data.get("receiverID_add"),
        sender_id: data.get("senderid_add")
    }

    for (const info in newData) {
        console.log(newData[info])
        if (newData[info] == null || newData[info] == "") {
            alert(`Please check the ${info}, as it may be incorrect or empty`)
            return false
        }
    }
    await fetch(`http://127.0.0.1:3000/Admin/addPackage`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'Application/json;charset=UTF-8'
        },
        method: 'post',
        body: JSON.stringify(newData)
    })
    alert("the Package has been added")
    return true
   
}

async function updateValidation() {
    let data = new FormData(document.getElementById("update_Package_form"));
    const newData = {
        package_number: data.get("Pid_update"),
        weight: data.get("Weight_update"),
        dimensions: data.get("Dimensions_update"),
        value: data.get("Value_update"),
        insurance_amount: data.get("IA_update"),
        status: data.get("Status_update"),
        expected_delivery_date: data.get("Expected_update"),
        final_delivery_date: data.get("Final_update"),
        category: data.get("Category_update"),
        paid: data.get("Payment_update"),
        //retail_id: data.get("retailID_update"),
        //location_id: data.get("location_id_update"),
        //receiver_id: data.get("receiverID_update"),
        //sender_id: data.get("senderid_update")
    }

    for (const info in newData) {
        console.log(newData[info])
        if (newData[info] == null || newData[info] == "") {
            alert(`Please check the ${info}, as it may be incorrect or empty`)
            return false
        }
    }
    await fetch(`http://127.0.0.1:3000/Admin/updatePackage`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'Application/json;charset=UTF-8'
        },
        method: 'post',
        body: JSON.stringify(newData)
    })
    
    alert("the Package has been updated")
    return true

}

async function removeValidationP() {
    let data = new FormData(document.getElementById("delete_Package_form"));
    const newData = {
        Package_id: data.get("Pid_remove"),
    }

    for (const info in newData) {
        if (newData[info] == null || newData[info] == "") {
            alert(`Please check the ${info}, as it may be incorrect or empty`)
            return false
        }
    }
    await fetch(`http://127.0.0.1:3000/Admin/deletePackage`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'Application/json;charset=UTF-8'
        },
        method: 'post',
        body: JSON.stringify(newData)
    })
    alert("the Package has been Removed")
    return true

}

// User editing


async function seeAddUser() {
    var add = document.getElementById('addFieldU');
    var up = document.getElementById('updateFieldU');
    var del = document.getElementById('removeFieldU');

    up.style.display = "none";
    del.style.display = "none";

    if (add.style.display === "none") {
        add.style.display = "block";
    } else {
        add.style.display = "none";
    }

}

async function seeUpdateUser() {
    var add = document.getElementById('addFieldU');
    var up = document.getElementById('updateFieldU');
    var del = document.getElementById('removeFieldU');

    add.style.display = "none";
    del.style.display = "none";

    if (up.style.display === "none") {
        up.style.display = "block";
    } else {
        up.style.display = "none";
    }

}

async function seeRemoveUser() {
    var add = document.getElementById('addFieldU');
    var up = document.getElementById('updateFieldU');
    var del = document.getElementById('removeFieldU');

    add.style.display = "none";
    up.style.display = "none";

    if (del.style.display === "none") {
        del.style.display = "block";
    } else {
        del.style.display = "none";
    }
}

async function addValidationCustomer() {
    let data = new FormData(document.getElementById("add_User_form"));
    const newData = {
        id: data.get("Uid_add"),
        Fname: data.get("fname_add"),
        Lname: data.get("lname_add"),
        password: data.get("passwordAddC"),
        email: data.get("email_add"),
        mobile_num: data.get("mobile_add"),
        data : "addCustomer"
        
    }

   // const id = JSON.stringify(newData.User_id)
    for (const info in newData) {
        if (newData[info] == null || newData[info] == "") {
            alert(`Please check the ${info}, as it may be incorrect or empty`)
            return false
        }
       // if (newData[info] == newData.User_id && (id.length != 10 || !(id.startsWith('c')))) {
        //    alert(`Please check the ${info}, as it has to start with c and has to be 10 in length`)
        //    return false
       // }
    }
    await fetch(`http://127.0.0.1:3000/Admin/addCostumer`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'Application/json;charset=UTF-8'
        },
        method: 'post',
        body: JSON.stringify(newData)
    })
    alert("the Customer has been added")
    return true
}

async function addValidationEmployee() {
    let data = new FormData(document.getElementById("add_User_form"));
    const newData = {
        id: data.get("Uid_add"),
        Fname: data.get("fname_add"),
        Lname: data.get("lname_add"),
        password: data.get("passwordAddC"),
        salary: data.get("salary_add"),
        emp_type: data.get("eType_add"),

    }

    for (const info in newData) {
        if (newData[info] == null || newData[info] == "") {
            alert(`Please check the ${info}, as it may be incorrect or empty`)
            return false
        }
    }
    await fetch(`http://127.0.0.1:3000/Admin/addEmployee`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'Application/json;charset=UTF-8'
        },
        method: 'post',
        body: JSON.stringify(newData)
    })
    alert("the Employee has been added")
    return true
}

async function updateValidationCustomer() {
    let data = new FormData(document.getElementById("update_User_form"));
    const newData = {
        id: data.get("Uid_update"),
        Fname: data.get("fname_update"),
        Lname: data.get("lname_update"),
        password: data.get('passwordUpdateC'),
        email: data.get("email_update"),
        mobile_num: data.get("mobile_update"),

    }

    for (const info in newData) {
        if (newData[info] == null || newData[info] == "") {
            alert(`Please check the ${info}, as it may be incorrect or empty`)
            return false
        }
    }
    await fetch(`http://127.0.0.1:3000/Admin/updateCostumer`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'Application/json;charset=UTF-8'
        },
        method: 'post',
        body: JSON.stringify(newData)
    })
    alert("the Customer has been updated")
    return true
}

async function updateValidationEmployee() {
    let data = new FormData(document.getElementById("update_User_form"));
    const newData = {
        id: data.get("Uid_update"),
        Fname: data.get("fname_update"),
        Lname: data.get("lname_update"),
        password: data.get("passwordUpdateC"),
        salary: data.get("salary_update"),
        emp_type: data.get("eType_update"),

    }

    for (const info in newData) {
        if (newData[info] == null || newData[info] == "") {
            alert(`Please check the ${info}, as it may be incorrect or empty`)
            return false
        }
    }
    await fetch(`http://127.0.0.1:3000/Admin/updateEmployee`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'Application/json;charset=UTF-8'
        },
        method: 'post',
        body: JSON.stringify(newData)
    })
    alert("the Employee has been updated")
    return true
}

async function removeValidationU() {
    let data = new FormData(document.getElementById("delete_User_form"));
    const newData = {
        id: data.get("Uid_remove"),
    }

    for (const info in newData) {
        if (newData[info] == null || newData[info] == "") {
            alert(`Please check the ${info}, as it may be incorrect or empty`)
            return false
        }
    }
    if (newData.id.startsWith('c')) {
        await fetch(`http://127.0.0.1:3000/Admin/deleteCostumer`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'Application/json;charset=UTF-8'
            },
            method: 'post',
            body: JSON.stringify(newData)
        })
    } else {
        await fetch(`http://127.0.0.1:3000/Admin/deleteEmployee`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'Application/json;charset=UTF-8'
            },
            method: 'post',
            body: JSON.stringify(newData)
        })
    }
    alert("the User has been Removed")
    return true

}

//  ####################### Generating Reports #######################
async function seePaid() {
    var paidf = document.getElementById('paidF');
    var status = document.getElementById('StatusCount');
    var category = document.getElementById('CategoryCount');
    var seeSpecificUserPack = document.getElementById('seeSpecificUserPack');
    var Packclassified = document.getElementById('Packclassified');

    status.style.display = "none";
    category.style.display = "none";
    seeSpecificUserPack.style.display = "none";
    Packclassified.style.display = "none";

    if (paidf.style.display === "none") {
        paidf.style.display = "block";
    } else {
        paidf.style.display = "none";
    }
    
}

async function seeStatusCount() {
    var paidf = document.getElementById('paidF');
    var status = document.getElementById('StatusCount');
    var category = document.getElementById('CategoryCount');
    var seeSpecificUserPack = document.getElementById('seeSpecificUserPack');
    var Packclassified = document.getElementById('Packclassified');

    paidf.style.display = "none";
    category.style.display = "none";
    seeSpecificUserPack.style.display = "none";
    Packclassified.style.display = "none";

    if (status.style.display === "none") {
        status.style.display = "block";
    } else {
        status.style.display = "none";
    }
}

async function seeCategoryCount() {
    var paidf = document.getElementById('paidF');
    var status = document.getElementById('StatusCount');
    var category = document.getElementById('CategoryCount');
    var seeSpecificUserPack = document.getElementById('seeSpecificUserPack');
    var Packclassified = document.getElementById('Packclassified');

    paidf.style.display = "none";
    status.style.display = "none";
    seeSpecificUserPack.style.display = "none";
    Packclassified.style.display = "none";

    if (category.style.display === "none") {
        category.style.display = "block";
    } else {
        category.style.display = "none";
    }
}

async function seeSpecificUserPack() {
    var paidf = document.getElementById('paidF');
    var status = document.getElementById('StatusCount');
    var category = document.getElementById('CategoryCount');
    var seeSpecificUserPack_ = document.getElementById('seeSpecificUserPack');
    var Packclassified = document.getElementById('Packclassified');

    paidf.style.display = "none";
    status.style.display = "none";
    category.style.display = "none";
    Packclassified.style.display = "none";

    if (seeSpecificUserPack_.style.display === "none") {
        seeSpecificUserPack_.style.display = "block";
    } else {
        seeSpecificUserPack_.style.display = "none";
    }
}

async function seePackclassified() {
    var paidf = document.getElementById('paidF');
    var status = document.getElementById('StatusCount');
    var category = document.getElementById('CategoryCount');
    var seeSpecificUserPack_ = document.getElementById('seeSpecificUserPack');
    var Packclassified = document.getElementById('Packclassified');

    paidf.style.display = "none";
    status.style.display = "none";
    category.style.display = "none";
    seeSpecificUserPack_.style.display = "none";

    if (Packclassified.style.display === "none") {
        Packclassified.style.display = "block";
    } else {
        Packclassified.style.display = "none";
    }
}

async function showAllPaid() {
    const showPaidF = document.getElementById('paidF')
    showPaidF.innerHTML = ""
    const response = await fetch(`http://127.0.0.1:3000/Admin/paidPackagesReport`)
    console.log(response)
    let output = ``
    if (response.ok) {
        const values_ = await response.json()
        console.log(values_)
        output = values_.map((values) => `
                <div>
                 
                    Package number:   ${values.package_number}<br>
                    Costumer ID:    ${values.id}<br>
                    Costumer Type:  ${values.costumer_type}<br>
                    Value:    ${values.value}<br>
                    Status:    ${values.status}<br>
                    Category: ${values.category}<br>  
                </div><br>
        `).join('')
    }
    showPaidF.innerHTML = output
}

async function showStatusCount() {
    const seeStatusInfo = document.getElementById('seeStatusInfo')
    let data = new FormData(document.getElementById("seeStatusForm"))
    seeStatusInfo.innerHTML = ""
    const date1 = data.get("seeStatusDate1")
    const date2 = data.get("seeStatusDate2")
    const response = await fetch(`http://127.0.0.1:3000/Admin/statusCount/${date1}/${date2}`)
    console.log(response)
    let output = ``
    if (response.ok) {
        const values_ = await response.json()
        console.log(values_)
        output = values_.map((values) => `
                <div>
                    Package number:${values.package_number}<br>
                    Status: ${values.status}<br>
                    final delivery date: ${values.final_delivery_date}<br>
                </div><br>
        `).join('')
    }
    seeStatusInfo.innerHTML = output
}

async function showCategoryCount() {
    const categoryCount = document.getElementById('seeCategoryInfo')
    let data = new FormData(document.getElementById("seeCategoryForm"))
    categoryCount.innerHTML = ""
    const date1 = data.get("seeCategoryDate1")
    const date2 = data.get("seeCategoryDate2")
    const response = await fetch(`http://127.0.0.1:3000/Admin/categoryCount/${date1}/${date2}`)
    console.log(response)
    let output = ``
    if (response.ok) {
        const values_ = await response.json()
        console.log(values_)
        output = values_.map((values) => `
                <div>
                    Package number:${values.package_number}<br>
                    Category: ${values.category}<br>
                    final delivery date: ${values.final_delivery_date}<br>
                </div><br>
        `).join('')
    }
    categoryCount.innerHTML = output
}


async function showSpecificUserPack() {
    const showPackInfoDiv = document.getElementById('showingUserPackInfo')
    let data = new FormData(document.getElementById("SpecificUserPackForm"))
    showPackInfoDiv.innerHTML = ""
    const id_ = data.get("SpecificUserPackID") 
    const response = await fetch(`http://127.0.0.1:3000/Admin/specificUserPack,${id_}`)
    console.log(response)
    let output = ``
    if (response.ok) {
        const values_ = await response.json()
        console.log(values_)
        output = values_.map((values) => `
                <div>
                    Package number:${values.package_number}<br>
                    Package Type: ${values.costumer_type}<br>
                </div><br>
        `).join('')
    }
    showPackInfoDiv.innerHTML = output
}

async function showClassPackage() {
    const PackClassifiedInfo = document.getElementById('PackClassifiedInfo')
    let data = new FormData(document.getElementById("PackclassifiedForm"))
    PackClassifiedInfo.innerHTML = ""
    const location = data.get("classLocation")
    const status = data.get("classStatus")
    const category = data.get("classCategory")
    const response = await fetch(`http://127.0.0.1:3000/Admin/classPackage/${location}/${status}/${category}`)
    console.log(response)
    let output = ``
    if (response.ok) {
        const values_ = await response.json()
        console.log(values_)
        output = values_.map((values) => `
                <div>
                    Package number:${values.package_number}<br>
                    Value: ${values.value}<br>
                    Status: ${values.status}<br>
                    Category: ${values.category}<br>
                    City: ${values.address}<br>
                </div><br>
        `).join('')
    }
    PackClassifiedInfo.innerHTML = output
}

//TraceBack Package
async function TraceBackAdmin() {
    const TraceBackAdminInfo = document.getElementById('TraceBackAdminInfo')
    let data = new FormData(document.getElementById("TraceBackForm"))
    TraceBackAdminInfo.innerHTML = ""
    const id = data.get("TraceID")
    const response = await fetch(`http://127.0.0.1:3000/Admin/traceBackPackage/${id}`)
    console.log(response)
    let output = ``
    if (response.ok) {
        const values_ = await response.json()
        console.log(values_)
        output = values_.map((values) => `
                <div>
                    Package number:${values.package_number}<br>
                    City: ${values.address}<br>
                    Schedule Number: ${values.schedule_number}<br>
                    Date: ${values.event_date}<br>
                </div><br>
        `).join('')
    }
    TraceBackAdminInfo.innerHTML = output
}

async function SendEmail() {
    alert('Notification has been sent')
}

//################ User ################

async function getUserCostumerPackage(id) {
    const userPackagesInfo = document.getElementById('userPackagesInfo')
    if (userPackagesInfo.style.display === "none") {
        userPackagesInfo.style.display = "block";
    } else {
        userPackagesInfo.style.display = "none";
        return
    }
    userPackagesInfo.innerHTML = ""
    const response = await fetch(`http://127.0.0.1:3000/User/${id}/getPackage`)
    console.log(response)
    let output = ``
    if (response.ok) {
        const values_ = await response.json()
        console.log(values_)
        output = values_.map((values) => `
                <div>
                    Package number:${values.package_number}<br>
                    Type:   ${values.costumer_type}<br>
                    Weight: ${values.weight}<br>
                    Dimensions: ${values.dimensions}<br>
                    Insurance Amount: ${values.insurance_amount}<br>
                    Expected Delivery Date: ${values.expected_delivery_date}<br>
                    Final Delivery Date: ${values.final_delivery_date}<br>
                    Status: ${values.status}<br>
                    Category: ${values.category}<br>
                    Paid: ${values.paid}<br>
                </div><br>
        `).join('')
    }
    userPackagesInfo.innerHTML = output
}

async function updateUserInfoU(id) {
    let data = new FormData(document.getElementById("up_User_info_form"));
    const newData = {
        id: id,
        //Fname: data.get("fname_update"),
       // Lname: data.get("lname_update"),
        password: data.get("psw_up"),
        email: data.get("email_up"),
        mobile_num: data.get("mob_up"),

    }

   for (const info in newData) {
       if (newData[info] == null || newData[info] == "") {
          alert(`Please check the ${info}, as it may be incorrect or empty`)
           return false
       }
    }
    await fetch(`http://127.0.0.1:3000/User/${id}/UpdateInfo`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'Application/json;charset=UTF-8'
        },
        method: 'post',
        body: JSON.stringify(newData)
    })
    alert("Your Info has been Updated!!!")
    return true
}

async function doPayment(id) {
    let data = new FormData(document.getElementById("PaymentForm"));
    const newData = {
        PackageID: data.get("payID")
    }

    for (const info in newData) {
        if (newData[info] == null || newData[info] == "") {
            alert(`Please check the ${info}, as it may be incorrect or empty`)
            return false
        }
    }
    await fetch(`http://127.0.0.1:3000/User/${id}/Payment`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'Application/json;charset=UTF-8'
        },
        method: 'post',
        body: JSON.stringify(newData)
    })
    alert("Your Package has been Paid")
    return true
}

async function sendRequest() {
    let data = new FormData(document.getElementById("RequestForm"));
    const newData = {
        Weight: data.get("WeightRS"),
        Dimensions: data.get("DimensionsRS"),
        location: data.get("locationName"),
        request_type: data.get("request_type")
    }

    for (const info in newData) {
        if (newData[info] == null || newData[info] == "") {
            alert(`Please check the ${info}, as it may be incorrect or empty`)
            return false
        }
    }
    alert('The request has been sent')
    return true
}
async function costumerTraceback_(id) {
    const statusTBInfo_ = document.getElementById('statusTBInfo_')
    statusTBInfo_.style.display = "block";
    if (statusTBInfo_.style.display === "none") {
        statusTBInfo_.style.display = "block";
    } else {
        statusTBInfo_.style.display = "none";
        return
    }
    statusTBInfo_.innerHTML = ""
    let data = new FormData(document.getElementById("CostumerTracebackForm_"))
    const status = data.get("statusTB_")
    console.log(status)
    const response = await fetch(`http://127.0.0.1:3000/User/UserTraceBack/${id}/${status}`)
    console.log(response)
    let output = ``
    if (response.ok) {
        const values_ = await response.json()
        console.log(values_)
        output = values_.map((values) => `
                <div>
                    Package number:${values.package_number}<br>
                    Type:   ${values.costumer_type}<br>
                    Status: ${values.status}<br>
                    Expected Delivery Date: ${values.expected_delivery_date}<br>
                    Final Delivery Date: ${values.final_delivery_date}<br>
                </div><br>
        `).join('')
    }
    statusTBInfo_.innerHTML = output
}
/*
//add costumer
async function sendAddcostumerData() {
    let addData = new FormData(document.getElementById("add_User_form"))
    const addInfo = {
        id: addData.get("Uid_add"),
        first: addData.get("fname_add"),
        last: addData.get("lname_add"),
        email: addData.get("email_add"),
        mobile: addData.get("mobile_add")
    }
    console.log(id)

    await fetch(`http://127.0.0.1:3000/Admin`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'Application/json;charset=UTF-8'
        },
        method: 'post',
        body: JSON.stringify(addInfo)
    })
    
}*/