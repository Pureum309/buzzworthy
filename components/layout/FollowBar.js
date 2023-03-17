import useUsers from "../../hooks/useUsers"
import Avatar from "../Avatar";

export default function FollowBar() {
    const { data: users = [] } = useUsers();

    if (users.length === 0) {
        return null;
    }
    console.log(users)
    
    return (
        <div className="px-6 py-4 hidden lg:block">
            <div className="bg-neutral-300 rounded-xl p-4">
                <h2 className="text-white text-xl font-semibold">Recommends</h2>
                    <div className="flex flex-col gap-6 mt-4">
                    { users.map((user) => (
                        <div key={user.id} className="flex flex-row gap-4">
                            <Avatar userId={user.id} />
                                <div className="flex flex-col">
                                <p className="text-white font-semibold text-sm">{user.name}</p>
                                <p className="text-neutral-900 text-sm">@{user.username}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}