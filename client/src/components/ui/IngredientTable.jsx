import React from 'react';
import { Table } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react"

const IngredientTable = ({data}) => {

  if(!data.length){
    return <h1>You dont have any recipes!</h1>
  }

	return (
    <Table.ScrollArea borderWidth="1px" rounded="md" height="700px">
      <Table.Root size="md" stickyHeader>
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
