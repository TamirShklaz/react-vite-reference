import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { useFilterStore } from "@/hooks/filter-store.ts";

type Props = {};

function ActiveSelector({}: Props) {
  const filterStore = useFilterStore();

  const handleSelectChange = (val: string) => {
    console.log(val);
    filterStore.onActiveChange(val as "all" | "active" | "inactive");
  };

  return (
    <Select value={filterStore.active} onValueChange={handleSelectChange}>
      <SelectTrigger>
        <SelectValue placeholder={"all companies"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>all companies</SelectItem>
        <SelectItem value={"active"}>active</SelectItem>
        <SelectItem value={"inactive"}>inactive</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default ActiveSelector;
