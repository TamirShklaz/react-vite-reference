import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className={"w-full min-h-screen bg-gray-50 flex flex-col items-center"}>
      <div className={"flex flex-col max-w-[800px] w-full p-4"}>
        <Outlet />
      </div>
    </div>
  );
};
