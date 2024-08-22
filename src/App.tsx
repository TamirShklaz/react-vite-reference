import './App.css'
import Companies from "@/pages/companies.tsx";

function App() {

    return (
        <div className={"w-full min-h-screen bg-gray-50 flex flex-col items-center"}>
            <div className={"flex flex-col max-w-[800px] w-full p-4"}>
                <Companies/>
            </div>
        </div>
    )
}

export default App
