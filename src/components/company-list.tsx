import CompanyListItem from "@/components/company-list-item.tsx";
import useSWRInfinite from "swr/infinite";
import { APIResponse } from "@/types/yc.types.ts";
import { useEffect } from "react";
import { fetcher } from "@/lib/fetcher.ts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.tsx";
import { useInView } from "react-intersection-observer";
import { useFilterStore } from "@/hooks/filter-store.ts";

type Props = {
  className?: string;
};
const CompanyList = ({ className }: Props) => {
  const filterStore = useFilterStore();

  const { data, error, isLoading, size, setSize } = useSWRInfinite<APIResponse>(
    (index, previousPageData: APIResponse) => {
      if (previousPageData && !previousPageData.nextPage) return null;
      const search = filterStore.search;
      const active = filterStore.active;
      const nextPage = search ? index : index + 1;
      let searchString = `https://api.ycombinator.com/v0.1/companies?q=${search}&page=${nextPage}`;
      if (active !== "all") searchString += `&status=${active}`;
      return searchString;
    },
    fetcher
  );

  const companies = data ? data.flatMap((page) => page?.companies) : [];
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = companies.length === 0;
  const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.nextPage);

  const { ref, inView } = useInView({
    threshold: 0.4
  });

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  const loadMore = () => {
    setSize((size) => size + 1);
  };

  if (error) {
    toast.error("Error fetching companies");
    console.error(error);
    return <div>Error...</div>;
  }

  if (isLoading) return <span>Loading...</span>;

  if (isEmpty) return <span>No companies found</span>;

  return (
    <div className={className}>
      {companies && companies.length > 0 && (
        <div className={"flex flex-col"}>
          <div className={"flex flex-col space-y-4"}>
            {companies.map((company, index) => (
              <div key={index}>
                <CompanyListItem company={company} className={"mb-4"} />
                <div className={"w-full border-t border-gray-300"} />
              </div>
            ))}
          </div>
          <div className={"mt-10 flex flex-col space-y-4"}>
            {!isReachingEnd && (
              <>
                {isLoadingMore && <span>Loading...</span>}
                <Button onClick={loadMore} disabled={isLoadingMore} ref={ref}>
                  Load More
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default CompanyList;
