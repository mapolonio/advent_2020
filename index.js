const [, , scriptArg] = process.argv;

const run = () => {
  const [day, part] = scriptArg.split('-');
  const { main } = require(`./day${day}/day${day}-part-${part}`);

  console.log(`Running Day ${day} - Part ${part}.js\n`);

  main();
};

run();
