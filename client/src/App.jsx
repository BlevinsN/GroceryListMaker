import React from 'react';
import { VStack } from '@chakra-ui/react';
import RecipeTable from "./components/ui/RecipeTable";
import { useQuery } from "@tanstack/react-query";
import {baseUrl} from "../constants/global-variable.js";

const App = () => {

  async function fetchRecipeDetails(params) {
    const res = await fetch(baseUrl);
  }

  const {isPending,isError,data,error} = useQuery({
    queryKey: ["recipe_details"],
    queryFn: fetchRecipeDetails
  })
  return (
    <VStack gap="6" align="flex-start">
      <RecipeTable/>
    </VStack>
  )
};

export default App