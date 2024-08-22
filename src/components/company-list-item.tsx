import { cn } from "@/lib/utils.ts";
import { Company } from "@/types/yc.types.ts";

type Props = {
  className?: string;
  company: Company;
};
const CompanyListItem = ({ className, company }: Props) => {
  return (
    <div className={cn(className, "flex flex-row")}>
      <div className={"mr-4"}>
        <img className={"object-cover w-[64px] h-[64px] rounded-full"} src={company.smallLogoUrl} />
      </div>
      <div className={"flex flex-col"}>
        <div className={"mb-2"}>
          <span className={"text-md font-medium mr-4"}>{company.name}</span>
          <span className={"text-sm text-gray-500"}>{company.locations[0]}</span>
        </div>
        <span className={"mb-2"}>{company.oneLiner}</span>
        <div className={"flex flex-row flex-wrap space-x-2 text-xs"}>
          {company.tags.map((tag, index) => (
            <div key={index} className={"bg-gray-200 rounded-3xl px-2 py-1"}>
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CompanyListItem;
