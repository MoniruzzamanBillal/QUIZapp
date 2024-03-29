let addingQuestion = document.querySelector(".addingQuestion");
let playingContainer = document.querySelector(".playingContainer");

playingContainer.classList.add("hide");

let restart = document.querySelector(".restart");

let numOfQue = document.querySelector(".qnum");
let correctAns = document.querySelector(".correct");
let wrongAns = document.querySelector(".wrong");
let totalScore = document.querySelector(".total");

// question adding part starts

let question = document.getElementById("question");
let add = document.querySelector(".add");
let clear = document.querySelector(".clear");

let option = document.querySelectorAll(".option");
let option1 = document.querySelector(".op1");
let option2 = document.querySelector(".op2");
let option3 = document.querySelector(".op3");
let option4 = document.querySelector(".op4");
let answer = document.querySelector(".answer");
let score = 0;
let wrong = 0;
let ind = 0;

add.addEventListener("click", update);

clear.addEventListener("click", () => {
  playingContainer.classList.add("hide");
  addingQuestion.classList.remove("hide");

  localStorage.clear();
  question.value = "";
  answer.value = "";
  option.forEach((ele) => {
    ele.value = "";
  });
  console.log("clear click");
  score = 0;
  wrong = 0;
});

function update() {
  questionf();
  optionf();
  answerf();
}

// function for question
function questionf() {
  let qson = localStorage.getItem("que");
  let que;

  if (qson === null) {
    que = [];
  } else {
    que = JSON.parse(qson);
  }

  let inpdata = question.value;
  if (inpdata.trim() != 0) {
    que.push(inpdata);
  } else {
    alert("enter your question");
  }

  localStorage.setItem("que", JSON.stringify(que));
  question.value = "";
}

// function for option
function optionf() {
  let optn = localStorage.getItem("opsion");
  let options;

  if (optn === null) {
    options = [];
  } else {
    options = JSON.parse(optn);
  }

  let o = "";

  // o = option1.value;
  o = checkInp(option1.value);
  options.push(o);
  o = checkInp(option2.value);
  options.push(o);
  o = checkInp(option3.value);
  options.push(o);
  o = checkInp(option4.value);
  options.push(o);

  function checkInp(val) {
    if (val.trim() != 0) {
      return val;
    } else {
      alert("enter your option");
    }
  }
  localStorage.setItem("opsion", JSON.stringify(options));
  option.forEach((ele) => {
    ele.value = "";
  });
}

// function for answer
function answerf() {
  let an = localStorage.getItem("answer");
  let ans;

  if (an === null) {
    ans = [];
  } else {
    ans = JSON.parse(an);
  }

  let inpAns = checkValidAns(answer.value);
  ans.push(inpAns);
  function checkValidAns(val) {
    if (val.trim() != 0) {
      return val;
    } else {
      alert("enter your answer");
    }
  }
  localStorage.setItem("answer", JSON.stringify(ans));
  answer.value = "";
}
// question adding part ends

// playing part starts

let submit = document.getElementById("submit");
let next = document.getElementById("next");
let start = document.querySelector(".start");
let questionBox = document.getElementById("questionBox");
let allInputs = document.querySelectorAll("input[type='radio']");

start.addEventListener("click", show);

function show() {
  addingQuestion.classList.add("hide");
  playingContainer.classList.remove("hide");

  restart.addEventListener("click", () => {
    ind = 0;
    score = 0;
    wrong = 0;
    correctAns.innerHTML = score;
    wrongAns.innerHTML = wrong;
    totalScore.innerHTML = score - wrong;
    changeQuestion(ind);
    chengeOption(ind);
    resetCheck();
  });

  submit.addEventListener("click", checkAns);

  let qson = localStorage.getItem("que");

  if (qson === null) {
    que = [];
  } else {
    que = JSON.parse(qson);
  }

  let optn = localStorage.getItem("opsion");
  let options;

  if (optn === null) {
    options = [];
  } else {
    options = JSON.parse(optn);
  }

  numOfQue.innerHTML = que.length;
  // console.log(`Num of question = ${que.length}`);

  changeQuestion(ind);
  chengeOption(ind);

  next.addEventListener("click", () => {
    ind++;
    if (ind > que.length - 1) {
      ind = que.length - 1;
    }
    // console.log(`index = ${ind}`);
    changeQuestion(ind);
    chengeOption(ind);
    resetCheck();
  });

  function changeQuestion(index) {
    questionBox.innerHTML = que[index];
    // console.log("count = " + index);
  }

  function chengeOption(index) {
    for (let j = index * 4, i = 0; j < index * 4 + 4, i < 4; j++, i++) {
      // console.log(`index j = ${j}`);
      allInputs[i].nextElementSibling.innerText = options[j];
    }
  }

  function checkAns() {
    let select = getAns();
    console.log(`select = ${select}`);

    let an = localStorage.getItem("answer");
    let ans;

    if (an === null) {
      ans = [];
    } else {
      ans = JSON.parse(an);
    }
    console.log(`answer = ${ans[ind]}`);
    if (select === ans[ind]) {
      // console.log("Your answer is correct");
      score++;
    } else {
      // console.log("You give a wrong answer");
      wrong++;
    }
    // console.log(`cprrect ans = ${score}`);
    // console.log(`wrong ans = ${wrong}`);
    correctAns.innerHTML = score;
    wrongAns.innerHTML = wrong;
    totalScore.innerHTML = score - wrong;
  }
}

// playing part ends

// function to get answer from user
function getAns() {
  let ans;
  allInputs.forEach((ele) => {
    if (ele.checked) {
      ans = ele.value;
    }
  });
  return ans;
}

function resetCheck() {
  allInputs.forEach((ele) => {
    if (ele.checked) {
      ele.checked = false;
    }
  });
}
