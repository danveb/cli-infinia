#!/usr/bin/env node

import chalk from "chalk"; // Chalk 5 is ESM so we'll "import" to ES Module instead of CommonJS ("require")
import chalkAnimation from "chalk-animation"; 

// console.log(chalk.bgGreen("Hello World")); 

// initialize sleep function 
// default param "ms" at 1.5s, returns a new Promise with setTimeout 
function sleep(ms=1500) {
  return new Promise(function(r) {
    setTimeout(r, ms); 
  })
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
  I am a ${chalk.underline("INFINIA")}, a command-line interface that lives through time and space.
  There is no ${chalk.cyan("right or wrong")} answer here; just be yourself.
  Happy coding! 
  `)
};

// node.js 14+ for top-level await (outside of async function body) 
await welcome(); 