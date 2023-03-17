import Sidebar from "./layout/Sidebar"
import FollowBar from "./layout/FollowBar"

export default function Layout({ children }) {
    return(
        <div className="h-screen bg-beige ">
            <div className="container h-full mx-auto xl:px-30 max-w-6xl">
                <div className="grid grid-cols-4 h-full">
                    <Sidebar />
                    <div 
                    className="
                        col-span-3 
                        lg:col-span-2 
                    ">
                    {children}
                    </div>
                    <FollowBar />
                </div>
        </div>
      </div>
    )
}