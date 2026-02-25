/* CONSTANTS */
const balance = $("#cash");
const income = $("#income");
const expense = $("#expense");
const trackContainer = $(".track-container-a");
const addIncome = $("#positive-btn");
const addExpense = $("#negative-btn");
const positiveLayer = document.querySelector(".transactin-positive");
const negativeLayer = document.querySelector(".transaction-negative");
const transButon = document.getElementById("transaction-btn");
const transSwitch = document.querySelectorAll(".track-container .item");
const addSwitch = document.querySelectorAll(".add-container .item");

let balanceValue = parseFloat(balance.text());
let incomeValue = parseFloat(income.text());
let expenseValue = parseFloat(expense.text());
let transItems = [];

/* PAYMENT CLASS */
class Payment {
  constructor(date, name, price, category, value, id) {
    this.date = date;
    this.name = name;
    this.price = price;
    this.category = category;
    this.value = value;
    this.id = id;
  }
}

/* EVENT LISTENERES */

transSwitch.forEach((el) => {
  el.addEventListener("click", changePanel);
});

addSwitch.forEach((el) => {
  el.addEventListener("click", changePanel);
});

transButon.addEventListener("click", addPayment);

/* FUNCTIONS */

/* changes slector by adding and removing active class */
function changePanel(e) {
  if (e.target.classList.contains("track")) {
    transSwitch.forEach((el) => {
      el.classList.remove("item-active");
    });
  } else if (e.target.classList.contains("add")) {
    changeAddCards(e.target.id);
    addSwitch.forEach((el) => {
      el.classList.remove("item-active");
    });
  }
  e.target.classList.add("item-active");
}

/* changes panels in add-container based on id of clicked selector adding or removing active class*/
function changeAddCards(id) {
  if (id === "add-positive-btn") {
    positiveLayer.classList.add("active");
    negativeLayer.classList.remove("active");
  } else if (id === "add-negative-btn") {
    positiveLayer.classList.remove("active");
    negativeLayer.classList.add("active");
  }
}

/* takes inputs and creates new payment oject and updates balance */
function addPayment() {
  if (positiveLayer.classList.contains("active")) {
    const date = positiveLayer.querySelector(".date").value;
    const name = positiveLayer.querySelector(".description").value;
    const price = positiveLayer.querySelector(".amount").value;
    if (date === "" || name === "" || price === "") {
      alert("Prosím vyplňte veškeré údaje");
    } else {
      const id = "transaction" + (transItems.length + 1);
      const newPayment = new Payment(date, name, price, "příjem", "green", id);
      transItems.push(newPayment);
      addTransactionCard(newPayment);
      updateBalance(price, "positive");
    }
  } else if (negativeLayer.classList.contains("active")) {
    const date = negativeLayer.querySelector(".date").value;
    const name = negativeLayer.querySelector(".description").value;
    const price = negativeLayer.querySelector(".amount").value;
    if (date === "" || name === "" || price === "") {
      alert("Prosím vyplňte veškeré údaje");
    } else {
      const id = "transaction" + (transItems.length + 1);
      const newPayment = new Payment(date, name, price, "výdaj", "red", id);
      transItems.push(newPayment);
      updateBalance(price, "negative");
      addTransactionCard(newPayment);
    }
  } else return;
  document.querySelector(".description").value = "";
  document.querySelector(".amount").value = "";
}
/* updates balance with amount of money, value is positive or neagetive */
function updateBalance(amount, value) {
  let parseAmount = parseFloat(amount);
  if (value === "positive") {
    console.log;
    incomeValue += parseAmount;
    balanceValue += parseAmount;
    income.text(incomeValue.toFixed(2));
  }
  if (value === "negative") {
    expenseValue += parseAmount;
    balanceValue -= parseAmount;
    expense.text(expenseValue.toFixed(2));
  }
  balance.text(balanceValue.toFixed(2));
}

// Creates new transaction card
function addTransactionCard(obj) {
  // Main container
  const newTransaction = document.createElement("div");
  newTransaction.classList.add("transaction-item");

  //date
  const newDate = document.createElement("div");
  newDate.className = "trans-date";
  newDate.innerText = obj.date;

  //název
  const newName = document.createElement("div");
  newName.className = "trans-name";
  newName.innerText = obj.name;

  //hodnota
  const newValue = document.createElement("div");
  newValue.className = "trans-value";
  newValue.innerText = obj.price + " Kč";

  //category
  const newCategory = document.createElement("div");
  newCategory.className = "trans-category";
  newCategory.innerText = obj.category;

  // color
  const newColor = document.createElement("acrticle");
  newColor.className = "trans-color";
  newColor.classList.add("color-" + obj.value);

  newTransaction.append(newDate, newName, newValue, newCategory, newColor);
  trackContainer.append(newTransaction);
}
