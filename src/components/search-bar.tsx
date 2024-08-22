import { Input } from "@/components/ui/input.tsx";
import { useFilterStore } from "@/hooks/filter-store.ts";

type Props = {
  className?: string;
};

function SearchBar({ className }: Props) {

  const filterStore = useFilterStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    filterStore.onSearchChange(e.target.value);
  };

  return (
    <div className={className}>
      <Input value={filterStore.search} type={"text"} placeholder={"Search"} onChange={handleSearchChange} />
    </div>
  );
}

export default SearchBar;
