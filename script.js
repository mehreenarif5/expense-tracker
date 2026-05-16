let total = 0;

// Load saved data
window.onload = function () {
    let data = localStorage.getItem("expenses");

    if (data) {
        let expenses = JSON.parse(data);

        expenses.forEach(exp => {
            addToUI(exp.text, exp.amount);
            total += Number(exp.amount);
        });

        updateTotal();
    }
};

function addExpense() {
    let text = document.getElementById("desc").value;
    let amount = document.getElementById("amount").value;

    if (text === "" || amount === "") {
        alert("Please fill all fields");
        return;
    }

    addToUI(text, amount);
    saveData(text, amount);

    total += Number(amount);
    updateTotal();

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
}

function addToUI(text, amount) {
    let li = document.createElement("li");

    li.innerHTML = `${text} - Rs ${amount} 
    <button onclick="deleteExpense(this, ${amount})">X</button>`;

    document.getElementById("list").appendChild(li);
}

function updateTotal() {
    document.getElementById("total").innerText = "Total: Rs " + total;
}

function saveData(text, amount) {
    let data = localStorage.getItem("expenses");
    let expenses = data ? JSON.parse(data) : [];

    expenses.push({ text, amount });

    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function deleteExpense(btn, amount) {
    btn.parentElement.remove();

    total -= Number(amount);
    updateTotal();
}
