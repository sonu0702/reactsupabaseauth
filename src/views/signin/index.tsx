import React, { Component, FormEvent, useEffect, useState } from 'react'
import { supabase } from '../../service/auth'
import { Link, useNavigate } from 'react-router-dom'
function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()
    const signIn = async () => {
        console.log(email, password);
        // e.preventDefault();
        const data = await supabase.auth.signIn({
            email: email,
            password: password
        })
        console.log("session", data.session);

        console.log(data.user);
        if (data.error != null) {
            setErrorMessage(data.error.message)
        } else {
            navigate("/", { replace: true })
        }
    }
    const signInWithGoogle = async () => {
        const response = await supabase.auth.signIn({
            provider: "google",

        });
        console.log("Google response", response.session, response.user, response.error,response.provider,response.url);
    }
    const logOut = async () => {
        let err = await supabase.auth.signOut()
        if (err == null) {
        }
    }
    useEffect(() => {
        console.log(email, password, errorMessage);
    }, [email, password, errorMessage])
    return <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)"
    }}>
        <h4>SIGN IN</h4>
        <button onClick={signInWithGoogle}>Continue with Google</button>
        <br></br>
        <label htmlFor="">Email</label>
        <input type="text" name='email' onChange={(e) => setEmail(e.target.value)} onFocus={() => setErrorMessage("")} />
        <br></br>
        <label htmlFor="">Password</label>
        <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} onFocus={() => setErrorMessage("")} />
        {errorMessage.length > 0 ? <div style={{ color: "red" }}>{errorMessage}</div> : null}
        <br></br>
        < input type="submit" value="sign In" name="signin" onClick={signIn} />
        <br></br>
        <Link to={"/sign-up"}>Sign Up</Link>
        <button onClick={logOut}>Logout</button>
    </div>
}

export default SignIn