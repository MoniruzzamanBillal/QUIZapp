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

add.addEventListener("click", update);

clear.addEventListener("click", () => {
  localStorage.clear();
  question.value = "";
  answer.value = "";
  option.forEach((ele) => {
    ele.value = "";
  });
  console.log("clear click");
  score = 0;
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

  o = option1.value;
  options.push(o);
  o = option2.value;
  options.push(o);
  o = option3.value;
  options.push(o);
  o = option4.value;
  options.push(o);

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

  let inpAns = answer.value;

  ans.push(inpAns);

  localStorage.setItem("answer", JSON.stringify(ans));

  answer.value = "";
}

// question adding part ends

// playing part starts

let submit = document.getElementById("submit");
let next = document.getElementById("next");
let sw = document.querySelector(".show");
let questionBox = document.getElementById("questionBox");
let allInputs = document.querySelectorAll("input[type='radio']");



sw.addEventListener("click", show);

function show() {

  
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

  let ind = 0;

  changeQuestion(ind);
  chengeOption(ind);

  next.addEventListener("click", () => {
    ind++;
    if (ind > que.length) {
      ind = que.length;
    }
    changeQuestion(ind);
    chengeOption(ind);
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



  function checkAns()
  {
    
    let select = getAns();
  // console.log(select);


  let an = localStorage.getItem("answer");
  let ans;

  if (an === null) {
    ans = [];
  } else {
    ans = JSON.parse(an);
  }
// console.log(`answer = ${ans[ind]}`)
  if(select === ans[ind])
  {
    console.log("Ypur answer is correct");
    score++;
  }
  else{
    console.log("You give a wrong answer");
  }

  console.log(`Your score = ${score}`);


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
};
