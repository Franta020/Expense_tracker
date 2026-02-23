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
console.log(balanceValue);
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
    const name = positiveLayer.querySelector(".description").value;
    const value = positiveLayer.querySelector(".amount").value;
    const id = "transaction" + (transItems.length + 1);

    transItems.push({
      name: name,
      value: value,
      category: "příjem",
      color: green,
      id: id,
    });
    updateBalance(value, "positive");
  } else if (negativeLayer.classList.contains("active")) {
    const name = negativeLayer.querySelector(".description").value;
    const value = negativeLayer.querySelector(".amount").value;
    const id = "transaction" + (transItems.length + 1);
    transItems.push({
      name: name,
      value: value,
      category: "výdaj",
      color: red,
      id: id,
    });
    updateBalance(value, "negative");
  } else return;
}
/* amount of mouney, value id positive or neagetive */
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

  console.log(transItems);
}
