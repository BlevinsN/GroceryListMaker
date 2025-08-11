import React from 'react';
import {
  Button,
  CloseButton,
  Dialog,
  For,
  Stack,
  HStack,
  Portal,
  Input,
  VStack,
  StackSeparator,
  Grid,
  Text,
} from "@chakra-ui/react"

import {Field} from "./field.jsx";
import SelectDishType from "./SelectDishType.jsx";
import { useState } from "react";
import {toast} from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {baseUrl} from "../../../constants/global-variable.js"
import {queryClient} from "../../../utils/queryClient.js";
import { MdAddCircle } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";

const InputRecipe = ({children,type="add",data}) => {
  const [open,setOpen] = useState(false);
  const [info,setInfo] = useState(
    type=="add"
    ?{
      dish_name:"",
      dish_creator:"",
      servings:"",
      ingredients:"",
      dish:"",
    }:data);

  const handleInfoChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const addRecipeMutation = useMutation({
    mutationFn:async(info)=> {
      const response = await fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "Content-Type":"application/json",
        },
      });
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.error);
      };
      return data; 
    },
    onError:(error)=> {
      toast.error(error.message);
    },
    onSuccess:()=>{
      setInfo({dish_name:"",dish_creator:"",servings:"",dish:"",ingredients:""});
      setOpen(false);
      toast.success("Recipe added!");
      queryClient.invalidateQueries({queryKey: ["recipe_details"]});
    },
  });

  const updateMutation = useMutation({
    mutationFn:async(info)=> {
      const response = await fetch(baseUrl + "/" + info.id, {
        method: "PUT",
        body: JSON.stringify(info),
        headers: {
          "Content-Type":"application/json",
        },
      });
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.error);
      };
      return data; 
    },
    onError:(error)=> {
      toast.error(error.message);
    },
    onSuccess:()=>{
      setOpen(false);
      toast.success("Recipe updated!");
      queryClient.invalidateQueries({queryKey: ["recipe_details"]});
    },
  });

  const requiredFields = ['dish_name','dish_creator','servings','ingredients'];

  const parseString = (str) =>
    str.split(",").map((item) => {
      const [name, quantity, units] = item.split("|");
      return { name, quantity, units };
    });

  const [ingredients, setIngredients] = useState(
  type === "add"
    ? []
    : parseString(data.ingredients)
  );

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  // Add a new blank row
  const addRow = () => {
    setIngredients([...ingredients, { name: "", quantity: "", units: "" }]);
  };

  // Remove a row
  const removeRow = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  // Convert table back to string format
  const toStringFormat = () => {
    return ingredients
      .map((ing) => `${ing.name}|${ing.quantity}|${ing.units}`)
      .join(",");
  };

  function handleSubmit(){
    for(const key of requiredFields){
      if(!info[key].toString().trim()){
        toast.error("Missing fields!");
        return;
      }
    }
    info.ingredients = toStringFormat();
    const infoUpdated = { ...info, dish: info.dish || null };
    if(type == "add"){
      addRecipeMutation.mutate(infoUpdated);
    } else {
      updateMutation.mutate(infoUpdated);
    }
  }

	return (
		<Dialog.Root
            placement="center"
            motionPreset="slide-in-bottom"
            open={open}
            onOpenChange={(e)=>setOpen(e.open)}
          >
            {children}
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>{type=="add"?"Add Recipe":"Update Recipe"}</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                  	<VStack gap="4" alignItems="flex-start">
	                    <Field label="Recipe Name" required>
	                    	<Input name="dish_name" placeholder="Enter recipe name" value={info.dish_name} onChange={handleInfoChange}/>
	                    </Field>
	                    <Field label="Recipe Author" required>
	                    	<Input name="dish_creator" placeholder="Enter author's name" value={info.dish_creator} onChange={handleInfoChange}/>
	                    </Field>
	                    <Field label="Servings" required>
	                    	<Input name="servings" placeholder="Enter number of servings" type="number" value={info.servings} onChange={handleInfoChange}/>
	                    </Field>
	                    <SelectDishType setInfo={setInfo}/>
                      <Dialog.Title >Ingredients</Dialog.Title>
                      <Grid templateColumns="4.35fr 1fr 1fr auto" gap={2} mb={1}>
                        <Text fontWeight="bold" textAlign="center">Ingredient</Text>
                        <Text fontWeight="bold" textAlign="center">Quantity</Text>
                        <Text fontWeight="bold" textAlign="center">Units</Text>
                      </Grid>
                      {ingredients.map((ing,index) => (
                        <HStack alignItem="center">
    	                    <Input w="60%" name="ingredient" placeholder="Enter the ingredients" value={ing.name} onChange={(e)=> handleIngredientChange(index,"name",e.target.value)}/>
                          <Input w="15%" name="quantity" placeholder=" " value={ing.quantity} onChange={(e)=> handleIngredientChange(index,"quantity",e.target.value)}/>
                          <Input w="15%" name="units" placeholder=" " value={ing.units} onChange={(e)=> handleIngredientChange(index,"units",e.target.value)}/>
                          <IoIosRemoveCircle h="10" size="24" color="red" style={{ cursor: "pointer"}} onClick={() => removeRow(index)} />
                        </HStack>
                        ))}
                      <MdAddCircle size="30" onClick={addRow} />
                      </VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={handleSubmit}>{type=="add"?"Add":"Update"}</Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
	);
};

export default InputRecipe;