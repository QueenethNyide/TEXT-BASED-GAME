document.getElementById("nameForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const userName = document.getElementById("username").value;
  localStorage.setItem("userName", userName);
  document.querySelector(".landing-page").classList.add("hidden");
  document.querySelector(".game-rules").classList.remove("hidden");
  document.getElementById("userName").textContent = userName;
});

document.getElementById("beginQuiz").addEventListener("click", () => {
  document.querySelector(".game-rules").classList.add("hidden");
  document.querySelector(".quiz-container").classList.remove("hidden");
  loadScenario();
});

document.getElementById("nextQuestion").addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions[currentScenario].length) {
    loadQuestion();
  } else if (currentScenario < scenarios.length - 1) {
    currentScenario++;
    currentQuestionIndex = 0;
    loadScenario();
  } else {
    endGame();
  }
});

document.getElementById("restartQuiz").addEventListener("click", () => {
  currentScenario = 0;
  currentQuestionIndex = 0;
  document.querySelector(".game-end").classList.add("hidden");
  document.querySelector(".landing-page").classList.remove("hidden");
});

const scenarios = [
  "🛡️ Stage 1: Kitchen Safety - Learn the basics of staying safe in the kitchen !",
  "🍽️ Stage 2: After School - You're hungry! Let’s decide what to make with ingredients at home.",
  "🔪 Stage 3: Prep Like a Pro - Test your knowledge of cutting techniques and preparation.",
  "🍳 Stage 4: Cooking Time - Let’s explore different cooking methods and recipes.",
  "🍰 Stage 5: Desserts & Sweets - Sweeten your skills with dessert-making knowledge.",
  "🌟 Stage 6: Chef’s Challenge - Final stage! Master your culinary knowledge and skills."
];

const questions = [
  // Stage 1: Kitchen Safety
  [
    { question: "What should you do if you see a spill on the floor?", options: ["Leave it", "Clean it immediately", "Warn others"], correct: 1 },
    { question: "What is the safest way to hold a knife?", options: ["By the blade", "By the handle", "By the tip"], correct: 1 },
    { question: "Where should you store sharp tools?", options: ["In a drawer", "On the counter", "Out of reach of children"], correct: 2 },
    { question: "What should you avoid wearing in the kitchen?", options: ["Loose clothing", "Aprons", "Closed shoes"], correct: 0 },
    { question: "How should you handle hot pots?", options: ["With bare hands", "With oven mitts", "With a towel"], correct: 1 }
  ],
  // Stage 2: After School
  [
    { question: "Which food is a good source of energy after school?", options: ["Fruits", "Chips", "Ice Cream"], correct: 0 },
    { question: "What can you make with bread and eggs?", options: ["Toast", "Salad", "Omelet"], correct: 0 },
    { question: "Which drink is the healthiest?", options: ["Soda", "Juice", "Water"], correct: 2 },
    { question: "What is a quick snack?", options: ["Pizza", "Fruit Salad", "Roast Chicken"], correct: 1 },
    { question: "Which ingredient is best for a smoothie?", options: ["Vegetables", "Fruits", "Bread"], correct: 1 }
  ],
  // Stage 3: Prep Like a Pro
  [
    { question: "What’s the safest way to chop vegetables?", options: ["On a cutting board", "In your hand", "On a plate"], correct: 0 },
    { question: "How do you sharpen a knife?", options: ["With a sharpener", "On a plate", "In water"], correct: 0 },
    { question: "How do you peel a carrot?", options: ["With a peeler", "With a knife", "With your hands"], correct: 0 },
    { question: "What should you do before cutting meat?", options: ["Wash your hands", "Cut vegetables first", "Nothing"], correct: 0 },
    { question: "What is the best way to measure flour?", options: ["Spoon it into a cup", "Scoop it directly", "Guess"], correct: 0 }
  ],
  // Stage 4: Cooking Time
  [
    { question: "What is the first step in boiling pasta?", options: ["Add pasta to cold water", "Boil water", "Add sauce"], correct: 1 },
    { question: "How do you cook an omelet?", options: ["Boil it", "Fry it in a pan", "Bake it"], correct: 1 },
    { question: "What is steaming?", options: ["Cooking in water vapor", "Frying", "Boiling"], correct: 0 },
    { question: "How do you prevent food from sticking to a pan?", options: ["Add oil", "Use a dry pan", "Turn off the heat"], correct: 0 },
    { question: "What temperature should chicken be cooked to?", options: ["100°F", "165°F", "200°F"], correct: 1 }
  ],
  // Stage 5: Desserts & Sweets
  [
    { question: "What is the main ingredient in a cake?", options: ["Sugar", "Flour", "Eggs"], correct: 1 },
    { question: "How do you melt chocolate?", options: ["In a pan", "In a microwave", "In a double boiler"], correct: 2 },
    { question: "What is used to make icing?", options: ["Flour", "Powdered Sugar", "Butter"], correct: 1 },
    { question: "How do you know cookies are done?", options: ["They smell good", "They’re golden brown", "Both"], correct: 2 },
    { question: "What is whipped cream made of?", options: ["Butter", "Heavy cream", "Milk"], correct: 1 }
  ],
  // Stage 6: Chef’s Challenge
  [
    { question: "What spice is often used in curry?", options: ["Sugar", "Turmeric", "Vanilla"], correct: 1 },
    { question: "What is the purpose of marinating?", options: ["Flavor and tenderize", "Cook food", "Wash food"], correct: 0 },
    { question: "What is a garnish?", options: ["Decoration", "Sauce", "Side dish"], correct: 0 },
    { question: "What is the best way to store fresh herbs?", options: ["In water", "In the fridge", "On the counter"], correct: 1 },
    { question: "What is the safest way to taste hot soup?", options: ["Blow on it", "Taste it directly", "Let it cool slightly"], correct: 2 }
  ]
];

let currentScenario = 0;
let currentQuestionIndex = 0;

function loadScenario() {
  document.getElementById("scenario").textContent = scenarios[currentScenario];
  loadQuestion();
}

function loadQuestion() {
  const questionObj = questions[currentScenario][currentQuestionIndex];
  document.getElementById("question").textContent = questionObj.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  questionObj.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(index));
    optionsDiv.appendChild(button);
  });
  document.getElementById("nextQuestion").classList.add("hidden");
}

function checkAnswer(selected) {
  const questionObj = questions[currentScenario][currentQuestionIndex];
  const feedback = document.getElementById("feedback");
  if (selected === questionObj.correct) {
    feedback.textContent = `🎉 Correct! Well done, ${localStorage.getItem("userName")}!`;
    document.getElementById("nextQuestion").classList.remove("hidden");
  } else {
    feedback.textContent = "❌ Oops! Try again.";
  }
}

function endGame() {
  document.querySelector(".quiz-container").classList.add("hidden");
  document.querySelector(".game-end").classList.remove("hidden");
}
