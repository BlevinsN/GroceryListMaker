import React from 'react';
import {
  Button,
  CloseButton,
  Dialog,
  For,
  HStack,
  Portal,
  Input,
  VStack,
} from "@chakra-ui/react"

import {Field} from "./field.jsx";
import SelectDishType from "./SelectDishType.jsx";
import { useState } from "react";

const InputRecipe = () => {
	const [info,setInfo] = useState({dish_name:"",dish_creator:"",servings:"",dish_type:"",ingredients:""})
	function handleChange(e){
		setInfo((prev)=>({...prev,[e.target.name]:e.target.value}));
	}
	console.log(info);
	return (
		<Dialog.Root
            placement="center"
            motionPreset="slide-in-bottom"
          >
            <Dialog.Trigger asChild>
              <Button variant="outline">Add Recipe </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Add New Recipe</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                  	<VStack gap="4" alignItems="flex-start">
	                    <Field label="Recipe Name" required>
	                    	<Input name="dish_name" placeholder="Enter recipe name" value={info.dish_name} onChange={handleChange}/>
	                    </Field>
	                    <Field label="Recipe Author" required>
	                    	<Input name="dish_creator" placeholder="Enter author's name" value={info.dish_creator} onChange={handleChange}/>
	                    </Field>
	                    <Field label="Servings" required>
	                    	<Input name="servings" placeholder="Enter numeber of servings" type="number" value={info.servings} onChange={handleChange}/>
	                    </Field>
	                    <SelectDishType setInfo={setInfo}/>
	                    <Field label="Ingredients" required>
	                    	<Input name="ingredients" placeholder="Enter the ingredients" value={info.ingredients} onChange={handleChange}/>
	                    </Field>
                    </VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button>Save</Button>
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