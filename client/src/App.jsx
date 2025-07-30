import React from 'react'
import { Table } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const App = () => {
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
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.dish_type}</Table.Cell>
              <Table.Cell>{item.dish_name}</Table.Cell>
              <Table.Cell>{item.dish_creator}</Table.Cell>
              <Table.Cell>{item.servings}</Table.Cell>
              <Table.Cell>
                <MdDelete size={20}/>
                <FaEdit size={20}/>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
};

const items = [
  { id: 1, dish_name: "Corned Beef", dish_type:"dinner", dish_creator: "Nate", servings: 4 },
  { id: 2, dish_name: "Corned Beef", dish_type:"dinner", dish_creator: "Nate", servings: 4 },
  { id: 3, dish_name: "Corned Beef", dish_type:"dinner", dish_creator: "Nate", servings: 4 },
  { id: 4, dish_name: "Corned Beef", dish_type:"dinner", dish_creator: "Nate", servings: 4 },
  { id: 5, dish_name: "Corned Beef", dish_type:"dinner", dish_creator: "Nate", servings: 4 },
  { id: 6, dish_name: "Corned Beef", dish_type:"dinner", dish_creator: "Nate", servings: 4 },
]

export default App