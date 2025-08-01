import React from 'react';
import { Table } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { HStack } from '@chakra-ui/react';
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {queryClient} from "../../../utils/queryClient.js";
import {baseUrl} from "../../../constants/global-variable.js";
import InputRecipe from "./InputRecipe.jsx";
import {
  DialogTrigger
} from "@chakra-ui/react";
const RecipeTable = ({data}) => {

  if(!data.length){
    return <h1>You dont have any recipes!</h1>
  }

  const mutation = useMutation({
    mutationFn:async(id)=>{
      console.log("mutation function: ", id)
      const response = await fetch(baseUrl + '/' + id, {
        method: "DELETE",
        headers: {
          "Content-Type":"application/json",
        },
      });
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.error)
      }
      return data;
    },
    onError: (error)=>{
      //console.log(error.response);
      toast.error(error,response);
    },
    onSuccess:()=>{
      toast.success("Recipe deleted!");
      queryClient.invalidateQueries({queryKey: ["recipe_details"]});
    },
  });
	return (
    <Table.ScrollArea borderWidth="1px" rounded="md" height="160px">
      <Table.Root size="md" stickyHeader>
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader>Id</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Dish Type</Table.ColumnHeader>
            <Table.ColumnHeader>Dish Creator</Table.ColumnHeader>
            <Table.ColumnHeader>Servings</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.dish_name}</Table.Cell>
              <Table.Cell>{item.dish_type}</Table.Cell>
              <Table.Cell>{item.dish_creator}</Table.Cell>
              <Table.Cell>{item.servings}</Table.Cell>
              <Table.Cell>
                <HStack gap="3">
                  <MdDelete size={20} className="icon" onClick={()=>mutation.mutate(item.id)}/>
                  <InputRecipe data={item} type="update">
                    <DialogTrigger asChild>
                      <FaEdit size={20} className="icon"/>
                    </DialogTrigger>
                  </InputRecipe>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
    )
};

export default RecipeTable;
