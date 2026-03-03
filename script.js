/* CONSTANTS */
const balance = document.getElementById("cash");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const trackContainer = $(".track-container-a");
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
const categoryButtons = document.querySelectorAll(
  ".category-container .fa-solid",
);
const catName = document.querySelector(".cat-name");
const catIcon = document.querySelector(".cat-icon");
const catColor = document.querySelector(".cat-color");
const catBtn = document.getElementById("cat-btn");
const transactionPanel = document.querySelector(".transaction");
const categoryPanel = document.querySelector(".category-creation");
const addCatBtn = document.getElementById("plus-btn");

const paymentNames = [
  "Potraviny",
  "Oběd",
  "Večeře",
  "Elektřina",
  "Voda",
  "Plyn",
  "Nájem",
  "Internet",
  "Telefon",
  "Doprava",
  "Benzín",
  "MHD",
  "Pojištění",
  "Léky",
  "Oblečení",
  "Zábava",
  "Kino",
  "Restaurace",
  "Káva",
  "Sport",
  "Předplatné",
  "Streaming služby",
  "Domácnost",
  "Opravy",
  "Dárky",
];
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
  constructor(date, name, price, categoryId, id) {
    this.date = date; // "YYY-MM-DD"
    this.name = name;
    this.price = price; // +income / -expense
    this.categoryId = categoryId;
    this.id = id;
  }
  getDateObject() {
    // its date.split for random generator and date.value.split for user input
    const [y, m, d] = this.date.value.split("-");
    const dateObj = new Date(y, m - 1, d);
    return dateObj;
  }
  formatDate() {
    // its date.split for random generator and date.value.split for user input
    const [y, m, d] = this.date.value.split("-");
    const dateFormated = d + "." + m + "." + y;
    return dateFormated;
  }
}

class Category {
  constructor(id, name, icon, color) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.color = color;
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
      if (month === 12) {
        return date.getFullYear() === year;
      } else return date.getFullYear() === year && date.getMonth() === month;
    });
  }
  getMonthlySummary(year, month) {
    return this.getByMonth(year, month).reduce(
      (summary, payment) => {
        summary.balance += payment.price;
        if (payment.price > 0) {
          summary.income += payment.price;
        } else {
          summary.expense += payment.price;
        }
        return summary;
      },
      { income: 0, expense: 0, balance: 0 },
    );
  }
  GetSummaryByCategories(year, month) {
    return this.getByMonth(year, month).reduce((categories, payment) => {
      const cat = payment.categoryId;
    });
  }
}
const paymentManager = new PaymentManager();

class CategoryManager {
  constructor() {
    this.categories = [];
    this.selectedCategory = {};
  }
  add(name, icon, color) {
    const category = new Category(crypto.randomUUID(), name, icon, color);
    this.categories.push(category);
    return category;
  }
  getByID(id) {
    return this.categories.find((category) => (categoryId = id));
  }
  getAll() {
    return this.categories;
  }
}
const categoryManager = new CategoryManager();

/* EVENT LISTENERES */
leftArrow.addEventListener("click", circleMonthDown);
rightArrow.addEventListener("click", circleMonthUp);
catBtn.addEventListener("click", createUserCategory);
transButon.addEventListener("click", addPayment);
document.getElementById("back-btn").addEventListener("click", backToPayments);
addCatBtn.addEventListener("click", openCategoryCreator);

/* FUNCTIONS */

//testing function - creating categories
/* createCategories(); */
function createCategories() {
  const names = [
    "burger",
    "vine",
    "coins",
    "house",
    "shop",
    "bulb",
    "TV",
    "plane",
    "hearth",
    "gamepad",
  ];
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "brown",
    "violet",
    "black",
    "lightblue",
    "purple",
    "greenyellow",
  ];

  for (let i = 0; i < categoryButtons.length; i++) {
    categoryManager.add(names[i], categoryButtons[i].className, colors[i]);
  }
  console.log(categoryManager.categories);
}

addEventsToCategories();

function addEventsToCategories() {
  console.log("buttons updated");
  categoryButtons.forEach((button) =>
    button.addEventListener("click", selectCategory),
  );
}

// testing function - adding random payments
/* generatePayments(300);
 */
function generatePayments(number) {
  for (let i = 0; i < number; i++) {
    let randomeYear = "202" + (Math.floor(Math.random() * 3) + 5);
    let randomMonth = Math.floor(Math.random() * 12) + 1;
    let randomDay = Math.floor(Math.random() * 30 + 1);
    let randomDate = randomeYear + "-" + randomMonth + "-" + randomDay;
    let randomCategoryID =
      categoryManager.categories[
        Math.floor(Math.random() * categoryManager.categories.length)
      ].id;
    console.log(randomCategoryID);
    let randomPrice = Math.floor(Math.random() * 20000) - 9000;
    const randomId = "trans" + (paymentManager.payments.length + 1);

    const newPayment = new Payment(
      randomDate,
      randomPrice,
      randomName,
      randomId,
    );

    paymentManager.add(newPayment);
    addTransactionCard(newPayment);
    updateBalance();
  }
}
// WORKING APP FUNCTIONS
function createUserCategory() {
  let newName = catName.value;
  let newIcon = categoryManager.selectedCategory.icon;
  let newColor = catColor.value;
  categoryManager.add(newName, newIcon, newColor);
  console.log(categoryManager.categories);
}

renderCategoryIcons();

function renderCategoryIcons() {
  document.querySelector(".category-container").innerHTML = "";
  categoryManager.categories.forEach((cat) => {
    const newIcon = document.createElement("i");
    newIcon.className = cat.symbol;
    newIcon.addEventListener("click", selectCategory);
    document.querySelector(".category-container").appendChild(newIcon);
  });
}

// SELECT MONTH and updates year
function updateMonthAndYear() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  monthSelected.innerText = monthNames[currentMonth];
  year.innerText = currentDate.getFullYear();
}

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
  updateBalance();
}
function circleMonthUp() {
  const currentMonth = monthSelected.innerText;
  let monthIndex = monthNames.indexOf(currentMonth);
  if (monthIndex === monthNames.length - 1) {
    monthIndex = -1;
    updateYear("+1");
  }
  monthSelected.innerText = monthNames[monthIndex + 1];
  updateBalance();
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
    console.log(inputName);
    const id = "transaction" + (paymentManager.payments.length + 1);
    const newPayment = new Payment(
      inputDate,
      inputName.value,
      Number(inputPrice.value),
      categoryManager.selectCategory.id,
      id,
    );
    paymentManager.add(newPayment); /* 
    addTransactionCard(newPayment); */
    updateBalance();
    console.log(newPayment.category);
  }
  document.querySelector(".description").value = "";
  document.querySelector(".amount").value = "";
}

function selectCategory(el) {
  categoryManager.categories.forEach((category) => {
    if (category.icon === el.target.className) {
      categoryManager.selectedCategory = category;
      console.log("slected " + category);
    }
  });
}

function openCategoryCreator() {
  transactionPanel.classList.remove("active");
  categoryPanel.classList.add("active");
  addEventsToCategories();
}

function backToPayments() {
  transactionPanel.classList.add("active");
  categoryPanel.classList.remove("active");
  addCatBtn.addEventListener("click", openCategoryCreator);

  renderCategoryIcons();
}

/* updates balance for month and year */
function updateBalance() {
  const month = monthSelected.innerText;
  const monthIndex = monthNames.indexOf(month);
  const summaryCurrent = paymentManager.getMonthlySummary(
    Number(year.innerHTML),
    monthIndex,
  );

  // fomat numbers to currency
  let fBalance = formatMoney(summaryCurrent.balance);
  let fIncome = formatMoney(summaryCurrent.income);
  let fExpense = formatMoney(summaryCurrent.expense);

  // renders currency to UI
  balance.innerText = fBalance;
  income.innerText = fIncome;
  expense.innerText = fExpense;
}

// Creates new transaction card
function addTransactionCard(obj) {
  // Main container
  const newTransaction = document.createElement("div");
  newTransaction.classList.add("transaction-item");
  newTransaction.id = obj.id;

  //date
  const newDate = document.createElement("div");
  newDate.className = "tr-item-large";
  newDate.innerText = obj.formatDate(obj.date.value);

  //name
  const newName = document.createElement("div");
  newName.className = "tr-item-large";
  newName.innerText = obj.name;

  //price
  const newPrice = document.createElement("div");
  newPrice.className = "tr-item-large";
  newPrice.innerText = formatMoney(obj.price);

  //category
  const newCategory = document.createElement("div");
  newCategory.className = "trans-category";
  newCategory.innerText = obj.category;

  /*   // edit
  const newEdit = document.createElement("div");
  newEdit.className = "tr-item-medium";
  newEdit.classList.add("fa-solid", "fa-pencil");
  newEdit.addEventListener("click", updatePayment); */

  // delete
  const newDelete = document.createElement("div");
  newDelete.className = "tr-item-medium";
  newDelete.classList.add("fa-regular", "fa-trash-can");
  newDelete.addEventListener("click", deletePayment);

  // color
  if (obj.price > 0) {
    newTransaction.classList.add("color-green");
  } else newTransaction.classList.add("color-red");

  // add all components
  newTransaction.append(newDate, newName, newPrice, newCategory, newDelete);
  trackContainer.append(newTransaction);
}

function deletePayment(event) {
  const newId = event.target.parentElement.id;
  const foundPayment = event.target.parentElement;
  const newPayments = paymentManager.payments.filter((payment) => {
    return payment.id !== newId;
  });
  paymentManager.payments = newPayments;
  foundPayment.remove();
  updateBalance();
}

function updatePayment(event) {
  // TODO create logic for editing payments
  const newId = event.target.parentElement.id;
}

function formatMoney(price) {
  return price.toLocaleString("cs-CZ", {
    style: "currency",
    currency: "CZK",
  });
}
