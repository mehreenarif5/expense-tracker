let chart;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}
function addExpense() {
    let description = document.getElementById("desc").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let date = document.getElementById("date").value;
    let category = document.getElementById("category").value;

    // ✅ FIXED validation
    if (!description || isNaN(amount) || !date || !category) {
        alert("Please fill all fields!");
        return;
    }

    if (amount <= 0) {
        alert("Amount must be greater than 0");
        return;
    }

    let expense = {
        description,
        amount,
        date,
        category
    };

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
    updateChart();
    updateMonthlySummary();

    // clear fields
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("category").value = "";
}

function displayExpenses() {
    let list = document.getElementById("expense-list");
    let totalElement = document.getElementById("total");

    list.innerHTML = "";
    let total = 0;

    expenses.forEach((exp, index) => {
        total += exp.amount;

        list.innerHTML += `
            <div style="margin-top:10px; padding:10px; background:#f5f5f5; border-radius:10px;">
                <strong>${exp.description}</strong> - Rs ${exp.amount} <br>
                <small>${exp.category} | ${exp.date}</small>
                <br>
                <button onclick="deleteExpense(${index})">❌</button>
                <button onclick="editExpense(${index})">✏️</button>
            </div>
        `;
    });

    totalElement.innerText = total;
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    updateChart();
    updateMonthlySummary();
}

function editExpense(index) {
    let exp = expenses[index];

    document.getElementById("desc").value = exp.description;
    document.getElementById("amount").value = exp.amount;
    document.getElementById("date").value = exp.date;
    document.getElementById("category").value = exp.category;

    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
    updateChart();
    updateMonthlySummary();
}

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    let btn = document.getElementById("modeBtn");

    if (document.body.classList.contains("dark")) {
        btn.innerText = "☀️ Light Mode";
    } else {
        btn.innerText = "🌙 Dark Mode";
    }
}

// Load on refresh
window.onload = function () {
    displayExpenses();
    updateMonthlySummary();
    updateChart();
loadProfile();
    document.getElementById("date").valueAsDate = new Date();
    let savedPic = localStorage.getItem("profilePic");

if (savedPic) {
    let img = document.getElementById("profilePreview");
    img.src = savedPic;
    img.style.display = "block";
}
};

function updateChart() {
    let categories = {};

    expenses.forEach(exp => {
        if (categories[exp.category]) {
            categories[exp.category] += exp.amount;
        } else {
            categories[exp.category] = exp.amount;
        }
    });

    let labels = Object.keys(categories);
    let data = Object.values(categories);

    let canvas = document.getElementById("myChart");

    // ✅ FIX: agar canvas exist nahi karta to error na aaye
    if (!canvas) return;

    let ctx = canvas.getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Expenses',
                data: data,
                borderWidth: 1
            }]
        }
    });
}

function updateMonthlySummary() {
    let monthlyTotal = 0;

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    expenses.forEach(exp => {
        let expDate = new Date(exp.date);

        if (
            expDate.getMonth() === currentMonth &&
            expDate.getFullYear() === currentYear
        ) {
            monthlyTotal += exp.amount;
        }
    });

    document.getElementById("monthlySummary").innerText =
        "Monthly Total: Rs " + monthlyTotal;
}

function searchExpenses() {
    let keyword = document.getElementById("search").value.toLowerCase();

    let filtered = expenses.filter(exp =>
        exp.description.toLowerCase().includes(keyword)
    );

    displayFilteredExpenses(filtered);
}

function displayFilteredExpenses(data) {
    let list = document.getElementById("expense-list");
    list.innerHTML = "";

    data.forEach((exp) => {
        list.innerHTML += `
            <div>
                <strong>${exp.description}</strong> - Rs ${exp.amount}<br>
                <small>${exp.category} | ${exp.date}</small>
            </div>
        `;
    });
}

function filterCategory() {
    let selected = document.getElementById("filterCategory").value;

    let filtered = expenses.filter(exp =>
        selected === "" || exp.category === selected
    );

    displayFilteredExpenses(filtered);
}

function clearAllExpenses() {
    if (confirm("Delete all expenses?")) {
        expenses = [];
        localStorage.clear();
        displayExpenses();
        updateMonthlySummary();
        updateChart();
    }
}

function exportData() {
    let data = JSON.stringify(expenses, null, 2);
    alert(data);
}
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}
function goHome() {
    document.getElementById("homeSection").style.display = "block";
    document.getElementById("statsSection").style.display = "none";
    document.getElementById("settingsSection").style.display = "none";
}

function showStats() {
    document.getElementById("homeSection").style.display = "none";
    document.getElementById("statsSection").style.display = "block";
    document.getElementById("settingsSection").style.display = "none";

    updateChart(); // chart refresh jab open ho
}

function showSettings() {
    document.getElementById("homeSection").style.display = "none";
    document.getElementById("statsSection").style.display = "none";
    document.getElementById("settingsSection").style.display = "block";
}
function goHome() {
    document.getElementById("homeSection").style.display = "block";
    document.getElementById("statsSection").style.display = "none";
    document.getElementById("settingsSection").style.display = "none";
}

 // Load profile
function loadProfile() {
    let user = localStorage.getItem("username");

    if (user) {
        document.getElementById("profileName").innerText = user;
    }
}

// Update profile
function updateProfile() {
    let newName = document.getElementById("newName").value;

    if (!newName) {
        alert("Enter new username!");
        return;
    }

    localStorage.setItem("username", newName);
    document.getElementById("profileName").innerText = newName;

    alert("Profile Updated ✅");

    document.getElementById("newName").value = "";
}
document.getElementById("profilePic").addEventListener("change", function () {
    let file = this.files[0];

    if (file) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let img = document.getElementById("profilePreview");

            img.src = e.target.result;
            img.style.display = "block";

            // save in localStorage
            localStorage.setItem("profilePic", e.target.result);
        };

        reader.readAsDataURL(file);
    }
});
