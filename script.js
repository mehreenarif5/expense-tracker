let chart;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// ---------------- HOME / CHART / SETTINGS ----------------

function showSection(section) {

    document.getElementById("homeSection").style.display = "none";
    document.getElementById("chartSection").style.display = "none";
    document.getElementById("settingsSection").style.display = "none";

    if(section==="home"){
        document.getElementById("homeSection").style.display="block";
    }

    if(section==="chart"){
        document.getElementById("chartSection").style.display="block";
        updateChart();
    }

    if(section==="settings"){
        document.getElementById("settingsSection").style.display="block";
    }

}

// ---------------- ADD EXPENSE ----------------

function addExpense(){

    let description=document.getElementById("desc").value;
    let amount=parseFloat(document.getElementById("amount").value);
    let date=document.getElementById("date").value;
    let category=document.getElementById("category").value;

    if(description=="" || isNaN(amount) || date=="" || category==""){

        alert("Please fill all fields.");
        return;

    }

    if(amount<=0){

        alert("Amount must be greater than 0");
        return;

    }

    expenses.push({

        description:description,
        amount:amount,
        date:date,
        category:category

    });

    localStorage.setItem("expenses",JSON.stringify(expenses));

    displayExpenses();
    updateMonthlySummary();
    updateChart();

    document.getElementById("desc").value="";
    document.getElementById("amount").value="";
    document.getElementById("date").value="";
    document.getElementById("category").value="";

}

// ---------------- DISPLAY ----------------

function displayExpenses(){

    let list=document.getElementById("expense-list");
    let total=document.getElementById("total");

    list.innerHTML="";

    let sum=0;

    expenses.forEach((exp,index)=>{

        sum+=exp.amount;

        list.innerHTML+=`

        <div style="background:#f5f5f5;padding:10px;border-radius:10px;margin-top:10px;">

        <strong>${exp.description}</strong><br>

        Rs ${exp.amount}<br>

        ${exp.category} | ${exp.date}

        <br><br>

        <button onclick="editExpense(${index})">✏️</button>

        <button onclick="deleteExpense(${index})">❌</button>

        </div>

        `;

    });

    total.innerText=sum;

}

// ---------------- DELETE ----------------

function deleteExpense(index){

    expenses.splice(index,1);

    localStorage.setItem("expenses",JSON.stringify(expenses));

    displayExpenses();

    updateMonthlySummary();

    updateChart();

}

// ---------------- EDIT ----------------

function editExpense(index){

    let exp=expenses[index];

    document.getElementById("desc").value=exp.description;
    document.getElementById("amount").value=exp.amount;
    document.getElementById("date").value=exp.date;
    document.getElementById("category").value=exp.category;

    expenses.splice(index,1);

    localStorage.setItem("expenses",JSON.stringify(expenses));

    displayExpenses();

    updateMonthlySummary();

    updateChart();

}

// ---------------- SEARCH ----------------

function searchExpenses(){

    let keyword=document.getElementById("search").value.toLowerCase();

    let list=document.getElementById("expense-list");

    list.innerHTML="";

    expenses.filter(exp=>exp.description.toLowerCase().includes(keyword))

    .forEach((exp,index)=>{

        list.innerHTML+=`

        <div style="background:#f5f5f5;padding:10px;border-radius:10px;margin-top:10px;">

        <strong>${exp.description}</strong><br>

        Rs ${exp.amount}<br>

        ${exp.category} | ${exp.date}

        <br><br>

        <button onclick="editExpense(${index})">✏️</button>

        <button onclick="deleteExpense(${index})">❌</button>

        </div>

        `;

    });

}

// ---------------- MONTHLY SUMMARY ----------------

function updateMonthlySummary(){

    let total=0;

    let month=new Date().getMonth();

    let year=new Date().getFullYear();

    expenses.forEach(exp=>{

        let d=new Date(exp.date);

        if(d.getMonth()==month && d.getFullYear()==year){

            total+=exp.amount;

        }

    });

    document.getElementById("monthlySummary").innerText="Monthly Total: Rs "+total;

}

// ---------------- CHART ----------------

function updateChart(){

    let canvas=document.getElementById("myChart");

    if(!canvas) return;

    let data={};

    expenses.forEach(exp=>{

        if(data[exp.category]){

            data[exp.category]+=exp.amount;

        }

        else{

            data[exp.category]=exp.amount;

        }

    });

    let ctx=canvas.getContext("2d");

    if(chart){

        chart.destroy();

    }

    chart=new Chart(ctx,{

        type:"pie",

        data:{

            labels:Object.keys(data),

            datasets:[{

                data:Object.values(data)

            }]

        }

    });

}

// ---------------- DARK MODE ----------------

function toggleDarkMode(){

    document.body.classList.toggle("dark");

    let btn=document.getElementById("modeBtn");

    if(document.body.classList.contains("dark")){

        btn.innerText="☀️ Light Mode";

    }

    else{

        btn.innerText="🌙 Dark Mode";

    }

}

// ---------------- PROFILE ----------------

function loadProfile(){

    let user=localStorage.getItem("username");

    if(user){

        document.getElementById("profileName").innerText=user;

    }

}

function updateProfile(){

    let newName=document.getElementById("newName").value;

    if(newName==""){

        alert("Enter username");

        return;

    }

    localStorage.setItem("username",newName);

    document.getElementById("profileName").innerText=newName;

    alert("Profile Updated");

    document.getElementById("newName").value="";

}

// ---------------- PROFILE PIC ----------------

document.addEventListener("DOMContentLoaded",function(){

let input=document.getElementById("profilePic");

if(input){

input.addEventListener("change",function(){

let file=this.files[0];

if(file){

let reader=new FileReader();

reader.onload=function(e){

let img=document.getElementById("profilePreview");

img.src=e.target.result;

img.style.display="block";

localStorage.setItem("profilePic",e.target.result);

};

reader.readAsDataURL(file);

}

});

}

});

// ---------------- EXPORT ----------------

function exportData(){

    alert(JSON.stringify(expenses,null,2));

}

// ---------------- CLEAR ----------------

function clearAllExpenses(){

    if(confirm("Delete all expenses?")){

        expenses=[];

        localStorage.removeItem("expenses");

        displayExpenses();

        updateMonthlySummary();

        updateChart();

    }

}

// ---------------- LOGOUT ----------------

function logout(){

    window.location.href="/login";

}

// ---------------- PAGE LOAD ----------------

window.onload=function(){

    displayExpenses();

    updateMonthlySummary();

    updateChart();

    loadProfile();

    let date=document.getElementById("date");

    if(date){

        date.valueAsDate=new Date();

    }

    let pic=localStorage.getItem("profilePic");

    if(pic){

        let img=document.getElementById("profilePreview");

        img.src=pic;

        img.style.display="block";

    }

}
