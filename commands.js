const fs = require('fs');

const output = (content) => {
  process.stdout.write(content);
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
  }
}

const commandParse = (data, done) => {
  const args = data.split(' ');
  const cmd = args[0];
  if (commands[cmd]) {
    commands[cmd](args.slice(1), done);
  } else {
    output(`Command not found: ${data}`);
    done();
  }
}

module.exports = {
  commandParse
};
