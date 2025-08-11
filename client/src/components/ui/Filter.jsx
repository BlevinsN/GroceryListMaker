import React, {useState} from "react";
import { Menu, Button, Portal } from "@chakra-ui/react";
import DishTypeFilter from "./DishTypeFilter.jsx";
import ServingSizeFilter from "./ServingSizeFilter.jsx"

function Filter({handleFilter}) {

	const [dishTypeFilter, setDishTypeFilter] = useState("");
	const [servingSizeFilter, setServingSizeFilter] = useState("");

	const updateDishType = (value) => {
		setDishTypeFilter(value);
		handleFilter({dishType: value, servingSize: servingSizeFilter});
		console.log("Change to DishType:", value);
	};

	const updateServingSize = (value) => {
		setServingSizeFilter(value);
		handleFilter({dishType: dishTypeFilter, servingSize: value});
		console.log("Change to ServingSize:", value);
	};

	const resetFilter = () => {
		handleFilter({dishType:"", servingSize:""});
		setServingSizeFilter("");
		setDishTypeFilter("");
	};

	return (
		<Menu.Root>
	      <Menu.Trigger asChild>
	        <Button variant="outline" size="sm">
	          Filter
	        </Button>
	      </Menu.Trigger>
	      <Portal>
	        <Menu.Positioner>
	          <Menu.Content gap={4} padding={4}>
	            <DishTypeFilter value={dishTypeFilter} onChange={updateDishType}/>
	            <ServingSizeFilter value={servingSizeFilter} onChange={updateServingSize}/>
	            <Button onClick={resetFilter}> Clear </Button>
	          </Menu.Content>
	        </Menu.Positioner>
	      </Portal>
	    </Menu.Root>
	);
}

export default Filter;