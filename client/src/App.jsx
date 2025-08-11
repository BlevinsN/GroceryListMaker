import React,{useState, useEffect} from 'react';
import { VStack, HStack } from '@chakra-ui/react';
import RecipeTable from "./components/ui/RecipeTable";
import { useQuery } from "@tanstack/react-query";
import {baseUrl} from "../constants/global-variable.js";
import InputRecipe from "./components/ui/InputRecipe.jsx";
import IngredientTable from "./components/ui/IngredientTable";
import { ColorModeButton } from "./components/ui/color-mode";
import Filter from "./components/ui/Filter";
import {
  Button,
  DialogTrigger,
} from "@chakra-ui/react";

const App = () => {

  const [selectedData, setSelectedData] = useState(null);

  async function fetchRecipeDetails(params) {
    const res = await fetch(baseUrl);
    const data = await res.json();
    if(!res.ok){
      throw new Error(data.error);
    }
    return data;
  };

  const {isPending:isPending,isError:isError,data:data,error:error} = useQuery({
    queryKey: ["recipe_details"],
    queryFn: fetchRecipeDetails
  });

  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    if(data) {
      setFilteredRecipes(data);
    }
  }, [data]);

  function handleFilter({dishType, servingSize}){
    if(!data) return;

    let filtered = data;

    if(dishType && dishType !== "null"){
      filtered = filtered.filter((r) => r.dish === dishType);
    };
    if(servingSize && servingSize !== "null") {
      filtered = filtered.filter(r => Number(r.servings) >= servingSize);
    };

    setFilteredRecipes(filtered);
    console.log("Filtered Recipes:", filtered);
  }


  const [selectedDataIngredients, setSelectedDataIngredients] = useState(data);

  const handleRecipeData = (index_data) => {
    setSelectedData(index_data);
    if(!filteredRecipes) return;
    const IngredientData = filteredRecipes.filter(item => index_data.includes(item.id));
    setSelectedDataIngredients(IngredientData)
  };

  if(isPending) return "Loading";
  if(isError) return error.message;

  //console.log("data from postgres db:", data);
  return ( 
    <VStack>
      <HStack gap="6" align="flex-start" >
        <IngredientTable data={selectedDataIngredients}/>
        <VStack gap="6" align="flex-start">
          <HStack>
            <InputRecipe>
              <DialogTrigger asChild>
                <Button variant="outline">Add Recipe</Button>
              </DialogTrigger>
            </InputRecipe>
            <Filter handleFilter={handleFilter}/>
          </HStack>
          <RecipeTable onDataRecieved={handleRecipeData} data={filteredRecipes.length ? filteredRecipes : data}/>
        </VStack>
      </HStack>
      <ColorModeButton/>
    </VStack>
  )
};

export default App