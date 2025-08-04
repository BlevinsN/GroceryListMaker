import React from 'react';
import { VStack, HStack } from '@chakra-ui/react';
import RecipeTable from "./components/ui/RecipeTable";
import { useQuery } from "@tanstack/react-query";
import {baseUrl} from "../constants/global-variable.js";
import InputRecipe from "./components/ui/InputRecipe.jsx";
import IngredientTable from "./components/ui/IngredientTable";
import {
  Button,
  DialogTrigger,
} from "@chakra-ui/react";

const App = () => {

  async function fetchRecipeDetails(params) {
    const res = await fetch(baseUrl);
    const data = await res.json();
    if(!res.ok){
      throw new Error(data.error);
    }
    return data;
  }

  const {isPending,isError,data,error} = useQuery({
    queryKey: ["recipe_details"],
    queryFn: fetchRecipeDetails
  });

  if(isPending) return "Loading";
  if(isError) return error.message;

  console.log("data from postgres db:", data);
  return (
    <HStack gap="6" align="flex-start">
      <IngredientTable data={data}/>
      <VStack gap="6" align="flex-start">
        <InputRecipe>
          <DialogTrigger asChild>
            <Button variant="outline">Add Recipe</Button>
          </DialogTrigger>
        </InputRecipe>
        <RecipeTable data={data}/>
      </VStack>
    </HStack>
  )
};

export default App