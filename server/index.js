import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import recipeRoute from "./routes/recipes.js";

dotenv.config();

const app = express();
const PORT = 3000;
const corsOptions = {
	origin: "*"
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/recipes", recipeRoute);

app.listen(PORT,()=>{
	console.log('Listening on port ${PORT}');
})
