import React from "react";

const Profile = () =>{
    const user_name = localStorage.getItem('user');
    return (
        <div>
            <h1>your name is {JSON.parse(user_name).name}</h1>
        </div>
    )
}

export default Profile;