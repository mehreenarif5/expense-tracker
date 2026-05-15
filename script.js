let total = 0;

function addExpense() {
    let desc = document.getElementById("desc").value;
    let amount = document.getElementById("amount").value;

    if (desc === "" || amount === "") {
        alert("Please fill all fields");
        return;
    }

    let list = document.getElementById("list");

    let li = document.createElement("li");
    li.innerHTML = desc + " - Rs " + amount + 
    " <button onclick='removeExpense(this, " + amount + ")'>Delete</button>";

    list.appendChild(li);

    total += parseInt(amount);
    document.getElementById("total").innerText = total;

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
}

function removeExpense(btn, amount) {
    btn.parentElement.remove();

    total -= amount;
    document.getElementById("total").innerText = total;
}
