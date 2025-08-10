import React from 'react';
import { Table } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {baseUrl} from "../../../constants/global-variable.js";

const IngredientTable = ({data}) => {

  if(data.length === 0){
    return "No Ingredients Needed!";
  }

  const row_data = data.map(item => item.ingredients).flatMap(str => str.split(','));
  console.log(row_data);

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
          {row_data.map((item,index) => (
            <Table.Row key={index}>
              <Table.Cell>{item}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
    )
};

export default IngredientTable;
