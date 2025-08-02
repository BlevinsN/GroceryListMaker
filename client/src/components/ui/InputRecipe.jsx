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
import {toast} from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {baseUrl} from "../../../constants/global-variable.js"
import {queryClient} from "../../../utils/queryClient.js";

const InputRecipe = ({children,type="add",data}) => {
  const [open,setOpen] = useState(false);
	const [info,setInfo] = useState(
    type=="add"
    ?{
      dish_name:"",
      dish_creator:"",
      servings:"",
      ingredients:"",
      dish_type:"",
    }:data);
	function handleChange(e){
		setInfo((prev)=>({...prev,[e.target.name]:e.target.value}));
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
      setInfo({dish_name:"",dish_creator:"",servings:"",dish_type:"",ingredients:""});
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
  
  function handleSubmit(){
    for(const key of requiredFields){
      if(!info[key].toString().trim()){
        toast.error("Missing fields!");
        return;
      }
    }
    const infoUpdated = { ...info, dish_type: info.dish_type || null };
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