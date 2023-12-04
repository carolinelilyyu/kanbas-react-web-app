import { useEffect, useState } from "react";
import * as client from "./client";


function UserList(){
    const [user, setUsers] = useState([]);
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    }
    useEffect(() => {
        fetchUsers();
    } , []);
    return (
        <div>
            <h2>Users</h2>
            <div className="list-group">
                {/* {users.map((user) => (
                    <Link key={user._id}
                        to={`/project/profile/${user._id}`}
                        className="list-group-item"> 
                        {user.username}
                    </Link>
                ))} */}
                {users}
            </div>
        </div>
    )
}

export default UserList;