const fs = require('fs');
const chalk = require('chalk');
const request = require('request');

const output = (content) => {
  process.stdout.write(content);
}

const logErr = (err) => {
  process.stdout.write(chalk.black.bgRed(' Error! '));
  process.stdout.write(' ' + err);
}

const commands = {
  pwd: (args, done) => {
    output(process.cwd());
    done();
  },
  date: (args, done) => {
    output(Date());
    done();
  },
  ls: (args, done) => {
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
        output(file.toString() + '\n');
      })
      done();
    });
  },
  cat: (args, done) => {
    fs.readFile(args[0], 'utf8', (err, file) => {
      if (err) throw err;
      output(file);
      done();
    });
  },
  head: (args, done) => {
    fs.readFile(args[0], 'utf8', (err, file) => {
      if (err) throw err;
      let lines = file.split('\n');
      output(lines.slice(0, 5).join('\n'));
      done();
    });
  },
  tail: (args, done) => {
    fs.readFile(args[0], 'utf8', (err, file) => {
      if (err) throw err;
      let lines = file.split('\n');
      output(lines.slice(-5).join('\n'));
      done();
    });
  },
  sort: (args, done) => {
    fs.readFile(args[0], 'utf8', (err, file) => {
      if (err) throw err;
      let lines = file.split('\n');
      output(lines.sort().join('\n'));
      done();
    });
  },
  wc: (args, done) => {
    fs.readFile(args[0], 'utf8', (err, file) => {
      if (err) throw err;
      let bytes = file.length;
      let words = file.trim().split(/\s+/).length;
      let lines = file.split('\n').length;
      output(`${lines}  ${words}  ${bytes}  ${args[0]}`);
      done();
    });
  },
  uniq: (args, done) => {
    fs.readFile(args[0], 'utf8', (err, file) => {
      if (err) throw err;
      let lines = file.split('\n');
      let uniqLines = [];
      lines.forEach((element, index, arr) => {
        if (element !== arr[index + 1]) {
          uniqLines.push(element);
        }
      });
      output(uniqLines.join('\n'));
      done();
    });
  },
  curl: (args, done) => {
    request(args[0], (err, res, body) => {
      if (err) throw err;
      output(body);
      done();
    });
  }
}

const commandParse = (data, done) => {
  const args = data.split(' ');
  const cmd = args[0];
  try {
    if (commands[cmd]) {
      commands[cmd](args.slice(1), done);
    } else {
      output(`Command not found: ${data}`);
      done();
    }
  } catch (err) {
    logErr(err);
    done();
  }
}

module.exports = {
  commandParse
};
