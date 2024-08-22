import CompanyList from "@/components/company-list.tsx";
import SearchBar from "@/components/search-bar.tsx";
import { cn } from "@/lib/utils.ts";
import ActiveSelector from "@/components/active-selector.tsx";
import { useEffect } from "react";
import { useFilterStore } from "@/hooks/filter-store.ts";
import { useLocation, useNavigate } from "react-router-dom";

type Props = { className?: string };

const Companies = ({ className }: Props) => {

  const { search, active, onSearchChange, onActiveChange } = useFilterStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const searchParam = query.get("q");
    const statusParam = query.get("status");

    if (searchParam) onSearchChange(searchParam);
    if (statusParam) onActiveChange(statusParam as "all" | "active" | "inactive");

  }, []);

  useEffect(() => {
    const query = new URLSearchParams();
    if (search) query.set("q", search);
    else query.delete("q");

    if (active && active !== "all") query.set("status", active);
    else query.delete("status");

    navigate({ search: query.toString() }, { replace: true });

  }, [search, active, location.search]);

  return (
    <div className={cn(className, "flex flex-col space-y-4")}>
      <SearchBar />
      <ActiveSelector />
      <CompanyList />
    </div>
  );
};
export default Companies;
