import React from 'react';
import { VStack, HStack } from '@chakra-ui/react';
import RecipeTable from "./components/ui/RecipeTable";
import { useQuery } from "@tanstack/react-query";
import {baseUrl} from "../constants/global-variable.js";
import InputRecipe from "./components/ui/InputRecipe.jsx";
import IngredientTable from "./components/ui/IngredientTable";
import { ColorModeButton } from "./components/ui/color-mode";
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
  };

  async function fetchIngredientsDetails(params) {
    const res = await fetch(baseUrl+'/ing');
    const data = await res.json();
    if(!res.ok){
      throw new Error(data.error);
    }
    return data;
  };

  const {isPending:isPending1,isError:isError1,data:data1,error:error1} = useQuery({
    queryKey: ["recipe_details"],
    queryFn: fetchRecipeDetails
  });

  if(isPending1) return "Loading";
  if(isError1) return error1.message;

  console.log("data from postgres db:", data1);
  return ( 
    <VStack>
      <HStack gap="6" align="flex-start" >
        <IngredientTable data={data1}/>
        <VStack gap="6" align="flex-start">
          <InputRecipe>
            <DialogTrigger asChild>
              <Button variant="outline">Add Recipe</Button>
            </DialogTrigger>
          </InputRecipe>
          <RecipeTable data={data1}/>
        </VStack>
      </HStack>
      <ColorModeButton/>
    </VStack>
  )
};

export default App