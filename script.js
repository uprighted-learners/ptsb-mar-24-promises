/*
    This function counts from 1 - 5 synchronously.
*/
function countToFive() {
    console.log(1);
    console.log(2);
    console.log(3);
    console.log(4);
    console.log(5);
}
countToFive();

/*
    This function counts
    from 1 to 5
    asynchronously
*/
function countToFiveAsynchronously() {
    //Outputting 1 and 2
    console.log(1);
    console.log(2);

    //Outputting 3 and 4 after 3 seconds has passed
    setTimeout(function () {
        console.log(3);
        console.log(4);
    }, 3000)

    console.log(5);
}

countToFiveAsynchronously();


/*

    This code block is creating a Promise from the Promise API provided by JavaScript.
    We get back two callback functions: resolve and reject

    resolve - fulfilling a promise
    reject - not fulfilling a promise

    For either, you can pass back a value with it.

    I promise to pay you back Scott!
*/
const myPromise = new Promise(function (resolve, reject) {
    //Change this from false to true and vice versa and see what you get for the next code block
    const willPayBack = false;

    if (willPayBack) {
        resolve(5) //fulfilling
    } else {
        reject(":(") //not fulfilling
    }
});

// Code block for promise.
myPromise
    .then(function (money) { // then clause: this runs when our promise was resolved/fulfilled.
        console.log(`I was paid back ${money}! Thanks!`)
    })
    .catch(function (err) { // catch clause: this runs when our promise was rejected/not fulfilled
        console.log("I was not paid back!", err)
    })
    .finally(() => { // finally clause: THIS IS OPTIONAL but this runs when the promise was either resolved or rejected
        console.log("Nice to see you again.")
    });


/*
    This is an asynchronous function that fetches data from an API:
    This is marked as asynchronous because 'fetch' is an asynchronous action

    Using try + catch with await is the alternative to using the
    .then() + .catch() clauses method.
*/
async function getDataFromInternet() {
    //TRY: Attempt to fetch data from API
    try {
        let response = await fetch("https://official-joke-api.appspot.com/random_joke"); //Fetch from api
        let data = await response.json(); //Convert returned data into json format so that we can use the data within our program
        console.log(data); //Output data to console.
    }
    //CATCH: This run if anything goes wrong in our execution in our try block. Instead of that explosion of error, write something softer instead.
    catch (error) {
        console.log("Something wrong happened")
    }
}

getDataFromInternet(); //Calling the asynchronous function

/*
    Same code block as above for getDataFromInternet() just using the .then() + .catch()
    instead of using try + catch & await.
*/
fetch("https://official-joke-api.appspot.com/random_joke")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log("Something wrong happened", err);
    })

/*

    READLINE: For gathering input from the user in the console.

*/

/*
    The next lines of code is setup for readline.
    We don't need to fully understand it but setting it up like this will get us going.
*/
const readline = require("readline");
const readlineInterface = readline.createInterface(
    process.stdin,
    process.stdout
);

/*
    This 'ask' function returns a Promise
    that will resolve after providing an answer to the question

    * @param questionText - our question that we ask
*/
function ask(questionText) {
    return new Promise(function (resolve, reject) {
        readlineInterface.question(questionText, resolve); // 'quesetion' is a function provided by the readlineInterface. We are plugging in our question here.
    });
}

/*
    This is an asynchronous function that will run our ask function above with a question we give it.
*/
async function askTime() {
    /*
        This line of code does two things.
        1 - it executes the ask function with a question we give it.
        2 - Saves the returned result (a promise) into a variable called promise.
    */
    let promise = ask("What time is it? ");

    /*
        Using our .then() .catch() method for dealing with the promise.
        Since we resolve in the 'ask' function, the then() clause should execute after we type in an answer in our console.
        You can swap this out with await.
    */
    promise
        .then(() => {
            console.log("Thanks!")
        })
        .catch(() => {
            console.log("No problem.")
        })
        .finally(() => {
            //We have a finally() clause here. It makes sense in this situation since we have to close the readline interface afterwards in both scenarios
            console.log("See you next time");
            readlineInterface.close();
        })
}
askTime(); //Call the askTime() function
