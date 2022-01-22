import React, { Component } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
function UserProfile() {
    return <div>
        UserProfile
    </div>
}

function OwnUserProfile() {
    return <div>
        OwnUserProfile
    </div>
}
function Profile() {
    return <div>
        <nav>
            <Link to="me">My Profile</Link>
        </nav>

        <Routes>
            <Route path=":id" element={<UserProfile />} />
            <Route path="me" element={<OwnUserProfile />} />
        </Routes>
    </div>
}

export default Profile