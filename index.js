#!/usr/bin/env node

import chalk from "chalk"; // Chalk 5 is ESM so we'll "import" to ES Module instead of CommonJS ("require")
import chalkAnimation from "chalk-animation"; 
import inquirer from "inquirer"; 
import { createSpinner } from "nanospinner"; 

// console.log(chalk.bgGreen("Hello World")); 

// initialize userName to be used in cli
let userName; 

// initialize sleep function 
// default param "ms" at 1.5s, returns a new Promise with setTimeout 
function sleep(ms=1500) {
  return new Promise(function(r) {
    setTimeout(r, ms); 
  })
}; 

// helper function to check answer for question 1
async function handleAnswer1(isAnswer) {
  // instantiate createSpinner and sleep for 1.5s 
  const spinner = createSpinner("Checking answer...").start(); 
  await sleep(); 
  // check: if input isAnswer we'll issue a success message
  if(isAnswer) {
    spinner.success({ text: `Nice ${userName}, you're a developer!`}); 
  } else {
    spinner.error({ text: `Oh... looks like you're in the wrong place; good bye!`});
    process.exit(1); 
  }
};

// helper function to check answer for question 2
async function handleAnswer2(isAnswer) {
  // instantiate createSpinner and sleep for 1.5s 
  const spinner = createSpinner("Checking answer...").start(); 
  await sleep(); 
  // check: if input isAnswer we'll issue a success message
  if(isAnswer) {
    spinner.success({ text: `Hey ${userName} you do have some experience, keep it up!`}); 
  } else {
    spinner.error({ text: `Well it looks like you could use some time to study more...`});
    process.exit(1); 
  }
};

// async function welcome to cli-infinia 
async function welcome() {
  // initialize rainbowTitle with welcome message
  const rainbowTitle = chalkAnimation.rainbow("WELCOME TO CLI-INFINIA \n"); 
  await sleep(); 
  rainbowTitle.stop(); 
  // print out main body 
  console.log(`
  ${chalk.bgCyan("Hello World")}
  I am a ${chalk.underline("INFINIA")}, a command-line interface living through time and space. 
  Just be yourself; there is no ${chalk.cyan("right or wrong")} answer here.
  Happy coding! 
  `)
};

// node.js 14+ for top-level await (outside of async function body) 
await welcome(); 

// async function askName 
// prompt user for name and return it 
async function askName() {
  const answer = await inquirer.prompt({
    name: "user_name", 
    type: "input", 
    message: "What is your name?", 
    default() {
      return "User"
    }
  })
  userName = answer.user_name; 
};

await askName(); 

// async function question1 
// prompt user for question1 
// checks answer with helper function and returns it 
async function question1() {
  const answer = await inquirer.prompt({
    name: "question_1", 
    type: "list", 
    message: "What type of developer are you?\n", 
    choices: [
      "Frontend developer", 
      "Backend developer", 
      "Full stack developer", 
      "Dunno why I'm here...", 
    ],
  })
  return handleAnswer1(answer.question_1 !== "Dunno why I'm here..."); 
};

async function question2() {
  const answer = await inquirer.prompt({
    name: "question_2", 
    type: "list", 
    message: "How many years of experience do you currently have?\n", 
    choices: [
      "0 - 1", 
      "1 - 2", 
      "2 - 3", 
      "3+", 
      "?", 
    ],
  })
  return handleAnswer2(answer.question_2 !== "?"); 
};

await question1(); 
await question2(); 