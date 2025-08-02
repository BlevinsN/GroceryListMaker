import React from 'react';
import { Portal, Select, createListCollection } from "@chakra-ui/react"

const SelectDishType = ( {setInfo}) => {
	return (
		<Select.Root collection={dishtypes} size="sm" width="320px"
			onChange={(e)=>setInfo((prev) =>({ ...prev, role: e.target.value}))}>
			<Select.HiddenSelect />
			<Select.Label>Dish Type</Select.Label>
			<Select.Control>
				<Select.Trigger>
					<Select.ValueText placeholder="Select Dish Type" />
				</Select.Trigger>
				<Select.IndicatorGroup>
					<Select.Indicator />
				</Select.IndicatorGroup>
			</Select.Control>
			<Portal>
				<Select.Positioner>
					<Select.Content className="select">
					{dishtypes.items.map((dishtypes) => (
						<Select.Item item={dishtypes} key={dishtypes.value}>
					    	{dishtypes.label}
					    	<Select.ItemIndicator />
						</Select.Item>
						))}
					</Select.Content>
				</Select.Positioner>
			</Portal>
		</Select.Root>
	);
};


export default SelectDishType;

const dishtypes = createListCollection({
  items: [
    { label: "Breakfast", value: "Breakfast" },
    { label: "Lunch", value: "Lunch" },
    { label: "Dinner", value: "Dinner" },
    { label: "Dessert", value: "Dessert" },
    { label: "Snack", value: "Snack" },
    { label: "Side Dish", value: "SideDish" },
    { label: "Baked Good", value: "BakedGood" },
  ],
});
