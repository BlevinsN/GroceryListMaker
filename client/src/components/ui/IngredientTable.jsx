import React from 'react';
import { Table } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react"

const IngredientTable = ({data}) => {


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
