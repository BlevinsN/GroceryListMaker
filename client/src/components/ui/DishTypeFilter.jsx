import React from 'react';
import { Portal, Select, createListCollection, Text, HStack } from "@chakra-ui/react"

const DishTypeFilter = () => {
	return (
		<Select.Root collection={dishtypes} size="sm">
			<HStack gap="3">
				<Text>Dish Type</Text>
				<Select.HiddenSelect />
				<Select.Control>
					<Select.Trigger width="145px">
						<Select.ValueText placeholder="None" />
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
			</HStack>
		</Select.Root>
	);
};


export default DishTypeFilter;

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
