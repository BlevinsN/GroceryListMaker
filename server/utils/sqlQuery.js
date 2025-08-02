export const createDishClassificationQuery = `
	CREATE TYPE dish_type AS
	ENUM('Breakfast','Lunch','Dinner','Dessert','Snack','BakedGood','SideDish')
`;
export const createRecipeTableQuery = `
	CREATE TABLE recipe_details(
		id = SERIAL PRIMARY KEY,
		dish_name VARCHAR(50) NOT NULL,
		dish_creator VARCHAR(50) NOT NULL UNIQUE,
		servings SMALLINT NOT NULL,
		dish dish_type NOT NULL DEFAULT 'Dinner',
		ingredients VARCHAR(255) NOT NULL
	)`;

export const getAllRecipesQuery = 'SELECT * FROM recipe_details ORDER BY id';

export const createRecipeQuery = `	
	INSERT INTO recipe_details(dish_name,dish_creator,servings,dish,ingredients)
	VALUES($1,$2,$3,COALESCE($4::dish_type,'Dinner'::dish_type),$5) RETURNING *
	`;

export const getRecipeQuery = 'SELECT * FROM recipe_details WHERE id = $1';

export const deleteRecipeQuery = 'DELETE FROM recipe_details WHERE id = $1';

export const updateRecipeQuery = `
	UPDATE recipe_details
	SET 
	dish_name = COALESCE($1, dish_name),
	dish_creator = COALESCE($2, dish_creator),
	servings = COALESCE($3, servings),
	dish = COALESCE($4::dish_type, dish),
	ingredients = COALESCE($5, ingredients)
	WHERE id = $6
	RETURNING *;
	`;