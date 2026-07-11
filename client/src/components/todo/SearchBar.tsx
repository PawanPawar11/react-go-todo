import { Input, InputGroup } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <InputGroup
      startElement={<FiSearch />}
      width="100%"
      color="fg.muted"
    >
      <Input
        placeholder="Search tasks..."
        size="lg"
        borderRadius="2xl"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        bg="bg.panel"
        borderColor="border.subtle"
        _focus={{
          borderColor: "violet.500",
        }}
        transition="all 0.2s"
      />
    </InputGroup>
  );
}
