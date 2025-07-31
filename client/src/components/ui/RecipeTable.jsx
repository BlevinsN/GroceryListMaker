import React from 'react';
import { Table } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { HStack } from '@chakra-ui/react';

const RecipeTable = ({data}) => {
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
              <Table.Cell>{item.dish_type}</Table.Cell>
              <Table.Cell>{item.dish_name}</Table.Cell>
              <Table.Cell>{item.dish_creator}</Table.Cell>
              <Table.Cell>{item.servings}</Table.Cell>
              <Table.Cell>
                <HStack gap="3">
                  <MdDelete size={20} className="icon"/>
                  <FaEdit size={20} className="icon"/>
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
