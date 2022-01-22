import React, { Component, useState } from 'react';
import { supabase } from '../../service/auth'
import { Link, useNavigate } from 'react-router-dom'
function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()
    const signUp = async () => {
        console.log(email, password);
        const data = await supabase.auth.signUp({
            email: email,
            password: password
        })
        console.log(data.user);

        if (data.error != null) {
            setErrorMessage(data.error.message)
        } else {
            navigate("/", { replace: true })
        }
    }
    return <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)"
    }}>
        <h4>SIGN UP</h4>
        <label htmlFor="">Email</label>
        <input type="text" name='email' onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="">Password</label>
        <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} />
        {errorMessage.length > 0 ? <div style={{ color: "red" }}>{errorMessage}</div> : null}
        <input type="submit" value="sign up" name="signup" onClick={signUp} />
        <Link to={"/sign-up"}>Log In</Link>
    </div>
}

export default SignUp