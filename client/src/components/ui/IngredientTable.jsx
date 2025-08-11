import React from 'react';
import { Table } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {baseUrl} from "../../../constants/global-variable.js";

const IngredientTable = ({data}) => {

  //if(data.length === 0){
  //  return "No Ingredients Needed!";
  //}

  const parseIngredientsSafe = (str) => {
    if (!str || typeof str !== "string") return [];

    return str.split(",").map((item) => {
      const parts = item.split("|");
      const name = (parts[0] || "").trim();
      const quantity = parseFloat(parts[1]) || 1; // default 1 if missing or NaN
      const units = (parts[2] || "").trim();

      return { name, quantity, units };
    }).filter(ing => ing.name); // remove rows with no ingredient name
  };

  const consolidateIngredients = (recipes) => {
    const map = {};

    if(recipes){
      recipes.forEach((recipe) => {
        const ingList = parseIngredientsSafe(recipe.ingredients);

        ingList.forEach(({ name, quantity, units }) => {
          const key = `${name.toLowerCase()}|${units.toLowerCase()}`;
          if (!map[key]) {
            map[key] = { name, quantity, units };
          } else {
            map[key].quantity += quantity;
          }
        });
      });
    }

    return Object.values(map);
  };

  const list = consolidateIngredients(data);

	return (
    <Table.ScrollArea borderWidth="1px" rounded="md" height="765px">
      <Table.Root size="sm" stickyHeader>
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader>Ingredients</Table.ColumnHeader>
            <Table.ColumnHeader>Quantity</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {list.map((item,index) => (
            <Table.Row key={index}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.quantity}{item.units}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
    )
};

export default IngredientTable;
