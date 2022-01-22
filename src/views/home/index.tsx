import React, { Component, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../service/auth';
import { AuthSession } from "@supabase/supabase-js";
function Home() {
    const [session, setSession] = useState<AuthSession | null>(null)
    const [user, setUser] = useState<{ email: string }>({ email: "" })
    let navigate = useNavigate()
    const getData = () => {
        const session = supabase.auth.session()
        if (session) {
            console.log("session.user?.email!", session.user?.email!);
            setUser({ email: session.user?.email! })
        }
        console.log(`Get Data`);
    }
    const logOut = async () => {
        let err = await supabase.auth.signOut()
        if (err == null) {
        }
    }
    useEffect(() => {
        const userData = supabase.auth.user()
        console.log('userData',userData);
        const session = supabase.auth.session()
        setSession(session)
        if (session == null) {
            console.log("Could not get session");
            navigate("/sign-in", { replace: true })
            return
        }
        const supabaseData = supabase.auth.onAuthStateChange((event: string, session: AuthSession | null) => {
            console.log(event);
            if (event === "SIGNED_OUT") {
                navigate("/sign-in", { replace: true })
                return
            }
        })
        return () => {
            supabaseData.data?.unsubscribe()
        }
    }, [])
    useEffect(() => {
        getData()
    }, [])
    return <>
        Home of {user.email}
        <button onClick={logOut}>Log out</button>
    </>
}

export default Home