import React from "react";
import { Menu, Button, Portal } from "@chakra-ui/react";
import DishTypeFilter from "./DishTypeFilter.jsx";
import ServingSizeFilter from "./ServingSizeFilter.jsx"

function Filter({handleFilter}) {
	return (
		<Menu.Root>
	      <Menu.Trigger asChild>
	        <Button variant="outline" size="sm">
	          Filter
	        </Button>
	      </Menu.Trigger>
	      <Portal>
	        <Menu.Positioner>
	          <Menu.Content gap={40}>
	            <DishTypeFilter onChange={handleFilter}/>
	            <ServingSizeFilter onChange={handleFilter}/>
	          </Menu.Content>
	        </Menu.Positioner>
	      </Portal>
	    </Menu.Root>
	);
}

export default Filter;