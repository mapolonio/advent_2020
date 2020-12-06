const [, , scriptArg] = process.argv;

const run = async () => {
  const [day, part] = scriptArg.split('-');
  const { main } = require(`./day${day}/day${day}-part-${part}`);

  console.log(`Running Day ${day} - Part ${part}\n`);

  const result = await main();

  console.log(`Result: ${result}`);
};

run();
