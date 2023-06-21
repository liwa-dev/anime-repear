import { Button, Checkbox } from "@mui/material"
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import guestAvatar from "../imgs/guest.png";
import { closeNotification, closeToast, openNotification } from "../notificaiton/notif-system";
import { useSignIn } from "react-auth-kit";
import axios from "axios";
import Dashboard from "../dashboard";
import { useNavigate } from "react-router-dom";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]}\\|:;"'<,>.?/]).{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



export default function Login() {
    const navigate = useNavigate();
    const signIn = useSignIn();
    const userRef = useRef();
    const errRef = useRef();
    
    const [validSync, setValidSync] = useState(true);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);


    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    // const [matchPwd, setMatchPwd] = useState("");
    // const [validMatch, setValidMatch] = useState(false);
    // const [matchFocus, setMatchFocus] = useState(false);

    // const [errMsg, setErrMsg] = useState("");
    // const [success, setSuccess] = useState(false);




    // useEffect(() => {
    //     const result = USER_REGEX.test(user);
    //     console.log(result);
    //     console.log(user);
    //     setValidName(result);
    // }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        setValidPwd(result);
    }, [pwd])


    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        setValidEmail(result);
    }, [email])

    const handleSubmet = async (e) => {
        e.preventDefault();
        setValidSync(false);
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('pass', pwd);
            const response = await axios.post('https://accounts.fishyflick.repl.co/login', formData);


            if (response.data.msg === "success") {
                const data = await response.data;
                //   setValidSync(true);
                openNotification(2000, "You’ve successfully logged in.");
                setTimeout(() => {
                    closeNotification();
                    closeToast();
                    setTimeout(() => {
                        navigate("/dashboard/home");
                        signIn({
                            token: response.data.token,
                            expiresIn: 3600,
                            tokenType: "Bearer",
                            authState: {
                                email: email,
                                user: response.data.user
                            }
                          });
                        setValidSync(true);
                    }, 2000);
                }, 2500);
            } else {

                setTimeout(() => {
                    closeNotification();
                    closeToast();
                    setTimeout(() => {
                        setValidSync(true);
                    }, 1500)
                }, 2000);
                openNotification(1000, "invalide email or password");
            }
              // console.log(data);
            // setSuccess(true);
        } catch(e) {
            openNotification(2000, e.message);
            setTimeout(() => {
                closeNotification();
                closeToast();
                setTimeout(() => {
                    setValidSync(true);
                }, 2000);
            }, 3500);
            console.log(e); 
        }
    }
    return (
    <form className="account-form" onSubmit={handleSubmet}>
        <h4>Get login to access your account</h4>

        {/* <img src={guestAvatar} className="avatarGuest"></img> */}
        <input
            type="email"
            placeholder="Email"
            autoComplete="new-password"
            onChange={(e) => { setEmail(e.target.value); }}
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={() => { setEmailFocus(true) }}
            onBlur={() => { setEmailFocus(false) }}
            required></input>
        <p className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
            <i className='bx bxs-info-circle icon'></i>
            Email is invalide or format is incorract</p>
        <input 
            autoComplete="new-password"
            type="password"
            placeholder="Password"
            onChange={(e) => { setPwd(e.target.value); }}
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => { setPwdFocus(true) }}
            onBlur={() => { setPwdFocus(false) }}
            required></input>
        <p className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
            <i className='bx bxs-info-circle icon'></i>
            8 to 24 characters.<br></br>
            Must least includes lowercase letter and uppercase letter , digit and one special character
        </p>
        <div className="btn-register">
            <Button disabled={!validPwd || !validEmail|| !validSync} style={{
                backgroundColor: 'var(--primary-color)', borderRadius: '50px', width: '150px', height: '50px',
                color: 'var(--text-primary)',
            }} type="submit">{!validSync ? "Please wait..." : "Login"}</Button>
        </div>
    </form>
    )
}