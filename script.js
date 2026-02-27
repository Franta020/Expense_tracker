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
const inputDate = document.querySelector(".date");
const inputName = document.querySelector(".description");
const inputPrice = document.querySelector(".amount");
const leftArrow = document.querySelector(".fa-circle-left");
const rightArrow = document.querySelector(".fa-circle-right");
const monthSelected = document.querySelector(".month");
const year = document.querySelector(".year");

let balanceValue = Number(balance.text());
let incomeValue = Number(income.text());
let expenseValue = Number(expense.text());
let Payments = [];
const monthNames = [
  "Leden",
  "Únor",
  "Březen",
  "Duben",
  "Květen",
  "Červen",
  "Červenec",
  "Srpen",
  "Září",
  "Říjen",
  "Listopad",
  "Prosinec",
  "celý rok",
];
updateMonthAndYear();

/* CLASSES */
class Payment {
  constructor(date, name, price, category, value, id) {
    this.date = date; // "YYY-MM-DD"
    this.name = name;
    this.price = price; // +income / -expense
    this.category = category;
    this.id = id;
  }

  getDateObject() {
    const [y, m, d] = this.date.value.split("-");
    const dateObj = new Date(y, m - 1, d);
    return dateObj;
  }
  formatDate() {
    const [y, m, d] = this.date.value.split("-");
    const dateFormated = d + "." + m + "." + y;
    return dateFormated;
  }
}

class PaymentManager {
  constructor() {
    this.payments = [];
  }
  add(payment) {
    this.payments.push(payment);
  }

  remove(id) {
    this.payments = this.payments.filter((p) => p.id !== id);
  }

  getByMonth(year, month) {
    return this.payments.filter((p) => {
      const date = p.getDateObject();
      return date.getFullYear() === year && date.getMonth() === month;
    });
  }
  getMonthlySummary(year, month) {
    return this.getByMonth(year, month).reduce(
      (summary, payment) => {
        summary.balance += payment.price;
        if (payment.price > 0) {
          summary.income += payment.price;
        } else {
          summary.expense += Math.abs(payment.price);
        }
        return summary;
      },
      { income: 0, expense: 0, balance: 0 },
    );
  }
}
const paymentManager = new PaymentManager();

/* EVENT LISTENERES */
leftArrow.addEventListener("click", circleMonthDown);
rightArrow.addEventListener("click", circleMonthUp);

transButon.addEventListener("click", addPayment);

/* FUNCTIONS */

function updateMonthAndYear() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  monthSelected.innerText = monthNames[currentMonth];
  year.innerText = currentDate.getFullYear();
}

// SELECT MONTH and updates year

function circleMonthDown() {
  const currentMonth = monthSelected.innerText;
  let monthIndex = monthNames.indexOf(currentMonth);
  if (monthIndex < 1) {
    monthIndex = monthNames.length;
    updateYear("-1");
  } else if (monthIndex === monthIndex.length) {
    return;
  }
  monthSelected.innerText = monthNames[monthIndex - 1];
}
function circleMonthUp() {
  const currentMonth = monthSelected.innerText;
  let monthIndex = monthNames.indexOf(currentMonth);
  if (monthIndex === monthNames.length - 1) {
    monthIndex = -1;
    updateYear("+1");
  }
  monthSelected.innerText = monthNames[monthIndex + 1];
}

function updateYear(value) {
  let currentYear = year.innerText;
  let yearInt = Number(currentYear);
  if (value === "+1") {
    yearInt++;
  } else yearInt--;
  year.innerText = yearInt;
}

/* takes inputs and creates new payment oject and updates balance */
function addPayment() {
  if (
    inputDate.value === "" ||
    inputName.value === "" ||
    inputPrice.value === ""
  ) {
    alert("Prosím vyplňte veškeré údaje");
  } else {
    const id = "transaction" + (Payments.length + 1);
    const newPayment = new Payment(
      inputDate,
      inputName,
      Number(inputPrice.value),
      "příjem",
      id,
    );
    paymentManager.add(newPayment);
    addTransactionCard(newPayment);
    updateBalance();
  }
  document.querySelector(".description").value = "";
  document.querySelector(".amount").value = "";
}
/* updates balance for month and year */
function updateBalance() {
  const month = monthSelected.innerText;
  const monthIndex = monthNames.indexOf(month);
  console.log(
    paymentManager.getMonthlySummary(Number(year.innerHTML), monthIndex),
  );
}

// Creates new transaction card
function addTransactionCard(obj) {
  // Main container
  const newTransaction = document.createElement("div");
  newTransaction.classList.add("transaction-item");

  //date
  const newDate = document.createElement("div");
  newDate.className = "trans-date";
  newDate.innerText = obj.formatDate(obj.date.value);

  //name
  const newName = document.createElement("div");
  newName.className = "trans-name";
  newName.innerText = obj.name.value;

  //price
  const newPrice = document.createElement("div");
  newPrice.className = "trans-price";
  newPrice.innerText = formatMoney(obj.price);

  //category
  const newCategory = document.createElement("div");
  newCategory.className = "trans-category";
  newCategory.innerText = obj.category;

  // color
  const newColor = document.createElement("acrticle");
  newColor.className = "trans-color";
  newColor.classList.add("color-" + obj.value);
  newTransaction.append(newDate, newName, newPrice, newCategory, newColor);
  trackContainer.append(newTransaction);
}

function formatMoney(price) {
  return price.toLocaleString("cs-CZ", {
    style: "currency",
    currency: "CZK",
  });
}
