const { getInput } = require('../utils');

const parseInput = (input) => input.split('\n').map(parseFood);

const parseFood = (foodText) => {
  const [ingredientsText, allergensText] = foodText.split(' (contains ');

  return {
    ingredients: ingredientsText.split(' '),
    allergens: allergensText.substring(0, allergensText.length - 1).split(', ')
  };
};

const getSafeList = (foodList, ingredients, allergens) => {
  if (allergens.length === 0) {
    return foodList;
  }

  for (let i = 0; i < ingredients.length; i += 1) {
    const ingredient = ingredients[i];

    for (let a = 0; a < allergens.length; a += 1) {
      const allergen = allergens[a];
      const candidateList = tryList(foodList, ingredient, allergen);

      if (candidateList === null) {
        continue;
      }

      const possibleResult = getSafeList(
        candidateList,
        [...ingredients.slice(0, i), ...ingredients.slice(i + 1)],
        [...allergens.slice(0, a), ...allergens.slice(a + 1)]
      );

      if (possibleResult !== null) {
        return possibleResult;
      }
    }
  }

  return null;
};

const tryList = (foodList, ingredient, allergen) => {
  const result = [];

  for (const { ingredients, allergens } of foodList) {
    if (allergens.includes(allergen) && !ingredients.includes(ingredient)) {
      return null;
    }

    result.push({
      ingredients: ingredients.filter((ing) => ing !== ingredient),
      allergens: allergens.filter((allerg) => allerg !== allergen)
    });
  }

  return result;
};

const countSafeIngredients = (foodList) => {
  const result = {};
  let total = 0;

  for (const food of foodList) {
    for (const ingredient of food.ingredients) {
      result[ingredient] = result[ingredient] || 0;

      result[ingredient] += 1;
    }
  }

  for (const ingredient in result) {
    total += result[ingredient];
  }

  return total;
};

const getComponents = (foodList) => {
  const ingredients = new Set();
  const allergens = new Set();

  for (const food of foodList) {
    for (const ing of food.ingredients) {
      ingredients.add(ing);
    }

    for (const allerg of food.allergens) {
      allergens.add(allerg);
    }
  }

  return {
    ingredients: [...ingredients],
    allergens: [...allergens]
  };
};

const main = async (inputPath = 'day21/input') => {
  const foodList = await getInput(inputPath, parseInput);
  const { ingredients, allergens } = getComponents(foodList);
  const safeList = getSafeList(foodList, ingredients, allergens);
  const count = countSafeIngredients(safeList);

  return count;
};

module.exports = {
  main,
  parseInput
};
