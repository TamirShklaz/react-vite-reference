import { useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { useFilterStore } from "@/hooks/filter-store.ts";

type Props = {
  className?: string;
};

function SearchBar({ className }: Props) {
  const [search, setSearch] = useState("");

  const filterStore = useFilterStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
    filterStore.onSearchChange(e.target.value);
  };

  return (
    <div className={className}>
      <Input value={search} type={"text"} placeholder={"Search"} onChange={handleSearchChange} />
    </div>
  );
}

export default SearchBar;
