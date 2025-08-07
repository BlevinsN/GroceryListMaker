import{query} from "../utils/connectToDB.js";
import {createRecipeTableQuery,
		createDishClassificationQuery,
		getAllRecipesQuery,
		createRecipeQuery,
		getRecipeQuery,
		deleteRecipeQuery,
		updateRecipeQuery,
		getRecipeIngredientsQuery
} from "../utils/sqlQuery.js"
import {createError} from "../utils/error.js"

export async function getAllRecipes(req,res,next){
	try{
		const response = await query("SELECT to_regclass('recipe_details');");
		console.log(response);
		if(!response.rows[0].to_regclass){
			await query(createDishClassificationQuery);
			await query(createRecipeTableQuery);
		}
		const {rows} = await query(getAllRecipesQuery);

		res.status(200).json(rows);
	} catch(error){
		console.log(error.message);
		return next(createError(400, "Couldn't get recipe details!"));
	}
}

export async function getAllIngredients(req,res,next){
	try{
		const {rows} = await query(getRecipeIngredientsQuery);
		res.status(200).json(rows);
	} catch(error){
		console.log(error.message);
		return next(createError(400, "Couldn't get recipe ingredients! HELP"));
	}
}

export async function getRecipe(req,res,next){
	const id = req.params.id;
	const data = await query(getRecipeQuery, [id]);
	console.log(data);
	if(!data.rows.length){
		return next(createError(400,"Recipe not found!"));
	}
	res.status(200).json(data.rows[0]);
}
export async function deleteRecipe(req,res,next){
	const id = req.params.id;
	const data = await query(deleteRecipeQuery, [id]);
	console.log(data);
	if(!data.rowCount){
		return next(createError(400,"Recipe not found!"));
	}
	res.status(200).json({message:"Delete successfully"});
}
export async function updateRecipe(req,res,next){
	try{
		const{id} = req.params;
		const {dish_name,dish_creator,servings,dish,ingredients} = req.body;
		const result = await query(updateRecipeQuery,[dish_name,dish_creator,servings,dish,ingredients,id]);
		if(result.rowCount == 0){
			return res.status(400).json({error:"Recipe not found."});
		}
		res.status(200).json(result.rows[0]);
	} catch(error){
		res.status(400).json({error: error.message});
	}
}
export async function createRecipe(req,res,next){
	try{
		const {dish_name,dish_creator,servings,dish,ingredients} = req.body;
		if(!dish_name || !dish_creator || !servings || !ingredients){
			return res.status(400).json({error:"Missing fields"})
		};
		const data = await query(createRecipeQuery,[dish_name,dish_creator,servings,dish,ingredients]);
		res.status(201).json(data.rows[0])
	} catch(error){
		console.log(error,message);
		return next(createError(400,error,message));
	}
}