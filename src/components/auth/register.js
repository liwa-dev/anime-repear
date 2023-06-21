import { Button, Checkbox } from "@mui/material"
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { closeNotification, closeToast, openNotification } from "../notificaiton/notif-system";
import guestPic from "../imgs/guest.png";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]}\\|:;"'<,>.?/]).{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {


    const [guestAvatar, setGuestAvatar] = useState(guestPic);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setGuestAvatar(reader.result);
            };
            reader.readAsDataURL(file);
            setSelectedImage(file);
        }
    };

    const fileInputRef = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);


    const userRef = useRef();
    const errRef = useRef();

    const [validSync, setValidSync] = useState(true);

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);


    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])


    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
        console.log(match);
    }, [pwd, matchPwd])


    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        setErrMsg("");

    }, [user, pwd, matchPwd])

    const handleSubmet = async (e) => {
        e.preventDefault();
        setValidSync(false);
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const avatarFile = fileInputRef.current.files[0];
            const formData = new FormData();
            formData.append('user', user);
            formData.append('email', email);
            formData.append('pass', pwd);
            console.log(avatarFile);
            formData.append('avatar', avatarFile);

            const response = await fetch('https://accounts.fishyflick.repl.co/register', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                setTimeout(() => {
                    setValidSync(true);
                }, 7000);
                const data = await response.json();
                if (data.msg === "exist") {
                    closeNotification();
                    closeToast();
                    openNotification(2000, "This account already existe ");
                } else if (data.msg === "success") {
                    closeNotification();
                    closeToast();
                    openNotification(2000, "Success registered ");
                } else if (data.msg) {
                    closeNotification();
                    closeToast();
                    openNotification(2000, "Failed to register ");
                }
            } else {
                console.log('Server returned an error:', response.statusText);
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <form className="account-form" onSubmit={handleSubmet}>
            <h4>New a user? create new account</h4>
            {/* <input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
  style={{ display: 'none' }}
  ref={fileInputRef}
/>
{selectedImage ? (
  <img
    src={URL.createObjectURL(selectedImage)}
    className="avatarGuest"
    alt="Guest Avatar"
    onClick={() => fileInputRef.current.click()}
  />
) : (
  <img
    src={guestAvatar}
    className="avatarGuest"
    alt="Guest Avatar"
    onClick={() => fileInputRef.current.click()}
  />
)} */}

            <input
                type="text"
                placeholder="Username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => { setUser(e.target.value); }}
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => { setUserFocus(true) }}
                onBlur={() => { setUserFocus(false) }}
                required></input>
            <p className={userFocus && !validName ? "instructions" : "offscreen"}>
                <i class='bx bxs-info-circle icon'></i>
                Username Must be at least 4 letters, and no special character</p>
            <input
                type="email"
                placeholder="Email"
                autoComplete="off"
                onChange={(e) => { setEmail(e.target.value); }}
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => { setEmailFocus(true) }}
                onBlur={() => { setEmailFocus(false) }}
                required></input>
            <p className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                <i class='bx bxs-info-circle icon'></i>
                Email is invalide or format is incorract</p>
            <input
                type="password"
                autoComplete="off"
                placeholder="Password"
                onChange={(e) => { setPwd(e.target.value); }}
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => { setPwdFocus(true) }}
                onBlur={() => { setPwdFocus(false) }}
                required></input>
            <p className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                <i class='bx bxs-info-circle icon'></i>
                8 to 24 characters.<br></br>
                Must least includes lowercase letter and uppercase letter , digit and one special character
            </p>
            <input
                autoComplete="off"
                type="password"
                placeholder="Confirme Password"
                onChange={(e) => { setMatchPwd(e.target.value); }}
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => { setMatchFocus(true) }}
                onBlur={() => { setMatchFocus(false) }}
                required></input>
            <p className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <i class='bx bxs-info-circle icon'></i> Must mutch the first password input field
            </p>
            <div className="btn-register">
                <Button disabled={!validName || !validPwd || !validEmail || !validMatch || !validSync} style={{
                    backgroundColor: 'var(--primary-color)', borderRadius: '50px', width: '150px', height: '50px',
                    color: 'var(--text-primary)',
                }} type="submit">{!validSync ? "Please wait..." : "CREATE"}</Button>
            </div>

        </form>)
}