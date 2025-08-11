import React,{useState} from 'react';
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


  const [filteredData, setFilteredData] = useState(data);

  const handleRecipeData = (index_data) => {
    setSelectedData(index_data);
    console.log("Data recieved from child:", index_data);
    const newFilteredData = data.filter(item => index_data.includes(item.id));
    setFilteredData(newFilteredData)
  };

  if(isPending) return "Loading";
  if(isError) return error.message;

  console.log("data from postgres db:", data);
  return ( 
    <VStack>
      <HStack gap="6" align="flex-start" >
        <IngredientTable data={filteredData}/>
        <VStack gap="6" align="flex-start">
          <HStack>
            <InputRecipe>
              <DialogTrigger asChild>
                <Button variant="outline">Add Recipe</Button>
              </DialogTrigger>
            </InputRecipe>
            <Filter/>
          </HStack>
          <RecipeTable onDataRecieved={handleRecipeData} data={data}/>
        </VStack>
      </HStack>
      <ColorModeButton/>
    </VStack>
  )
};

export default App