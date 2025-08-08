import React from 'react';
import { Table } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {baseUrl} from "../../../constants/global-variable.js";

const IngredientTable = ({data}) => {

  if(data.length === 0){
    return "No Ingredients Needed!";
  }

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
          {data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.ingredients}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
    )
};

export default IngredientTable;
