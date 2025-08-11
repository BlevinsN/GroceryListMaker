import { HStack, NumberInput } from "@chakra-ui/react";
import { useState } from "react";
import {
  Text
} from "@chakra-ui/react";

const ServingSizeFilter = ({value, onChange}) => {
  const [objectVal, setObjectVal] = useState(value ?? "");
  return (
    <NumberInput.Root 
      min={1} 
      value={objectVal}
      onValueChange={(details) => {
        setObjectVal(details.value);
        onChange(details.value === "" ? null : Number(details.value));
      }}>
      <HStack gap="5">
        <Text>Servings</Text>
        <NumberInput.Control />
      <NumberInput.Input />
    </HStack>
    </NumberInput.Root>
  )
};

export default ServingSizeFilter;
