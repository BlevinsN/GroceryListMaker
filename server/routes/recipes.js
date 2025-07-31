import express from "express"
import {getAllRecipes,getRecipe,createRecipe,updateRecipe,deleteRecipe} from "../controllers/recipes.js";

const router = express.Router();

router.get("/", getAllRecipes);

// router.get("/", (req,res)=>{
// 	res.send("get all recipe details")
// });

router.post("/",createRecipe);

router.get("/:id",getRecipe);

router.delete("/:id",deleteRecipe);

router.put("/:id",updateRecipe);

export default router;