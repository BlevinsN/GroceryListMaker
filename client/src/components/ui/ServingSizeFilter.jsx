import { HStack, IconButton, NumberInput } from "@chakra-ui/react";
import { LuMinus, LuPlus } from "react-icons/lu";
import {
  Text
} from "@chakra-ui/react";

const ServingSizeFilter = () => {
  return (
    <NumberInput.Root defaultValue="2" unstyled spinOnPress={false}>
      <HStack gap="5">
        <Text>Servings</Text>
        <NumberInput.DecrementTrigger asChild>
          <IconButton variant="outline" size="sm">
            <LuMinus />
          </IconButton>
        </NumberInput.DecrementTrigger>
        <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
        <NumberInput.IncrementTrigger asChild>
          <IconButton variant="outline" size="sm">
            <LuPlus />
          </IconButton>
        </NumberInput.IncrementTrigger>
      </HStack>
    </NumberInput.Root>
  )
}

export default ServingSizeFilter;