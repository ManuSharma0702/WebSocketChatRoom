const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What's your favourite number? ", (answer) => {
    var favourite = Number(answer);
    console.log(favourite);
    rl.close();
});