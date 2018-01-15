const chalk = require('chalk');
const commands = require('./commands');

const prompt = chalk.blue('\n-> ');

const logErr = (err) => {
  process.stdout.write(chalk.black.bgRed('Error: '));
  process.stdout.write(err);
}

const done = () => {
  process.stdout.write(prompt);
}

done();

process.stdin.on('data', function(data) {
  data = data.toString().trim();
  commands.commandParse(data, done);
});
