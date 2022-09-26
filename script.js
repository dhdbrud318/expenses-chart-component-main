const bars = document.querySelectorAll(".chart__bar");
const expenditures = document.querySelectorAll(".chart__current-val");
const dataAddress = "/data.json";
let min, max;

const highest_comsumption = { day: "", amount: 0 };

async function loadData(url) {
  const res = await fetch(url);
  return await res.json();
}

loadData(dataAddress)
  .then((data) => {
    (min = data[0]), (max = data[0]);

    expenditures.forEach((e, index) => {
      e.innerHTML = `$${data[index].amount}`;
      max = data[index].amount > max.amount ? data[index] : max;
      min = data[index].amount < min.amount ? data[index] : min;
    });

    bars.forEach((bar, index) => {
      calcBar(data[index], bar, index);
    });

    setHighestExpenditureClr(max.day);
  })
  .catch((error) => console.log(error));

function calcBar(data, bar, index) {
  const normalized =
    ((data.amount - min.amount) / (max.amount - min.amount)) * 8 + 1.375;
  bar.style.height = `calc(${normalized}rem)`;
  console.log(normalized);
  expenditures[index].style.bottom = `calc( ${normalized}rem + 2rem)`;
}

function setHighestExpenditureClr(highest) {
  const date = document.querySelector(`#${highest}`);
  date.style.backgroundColor = "var(--cyan)";
}

bars.forEach((bar) => {
  const curVal = document.querySelector(`#current-val-${bar.id}`);

  bar.addEventListener("mouseover", () => {
    curVal.classList.add("active-var");
  });

  bar.addEventListener("mouseout", () => {
    curVal.classList.remove("active-var");
  });
});
