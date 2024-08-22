import CompanyList from "@/components/company-list.tsx";
import SearchBar from "@/components/search-bar.tsx";
import { cn } from "@/lib/utils.ts";
import ActiveSelector from "@/components/active-selector.tsx";

type Props = { className?: string };

const Companies = ({ className }: Props) => {
  return (
    <div className={cn(className, "flex flex-col space-y-4")}>
      <SearchBar />
      <ActiveSelector />
      <CompanyList />
    </div>
  );
};
export default Companies;
