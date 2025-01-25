
import styles from './Login.module.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../apis/authService'
import {Toaster, toast} from 'react-hot-toast'
function Login() {
    const navigate=useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler=async(e)=>{
        e.preventDefault();
        if(!username || !password){
            toast.error('Please fill all fields');
            return;
        }
        try{
            await toast.promise(
                handleSubmit({username,password}),
                {
                    loading:'Logging in...',
                    success:'Logged in successfully',
                    error:(e)=>{
                        if(e?.response?.data?.message){
                            return e.response.data.message;
                        }
                        return 'An error occurred'
                    }
                }
            )
        }catch(e){
            console.error('Error logging in:',e);
        }
    }
    const handleSubmit=async ()=>{
        try{
            const response=await login({username,password});
            localStorage.setItem('token',response.token);
            navigate('/', {
                    state:{
                        user: response.user
                    }
            });
        }catch(e){
            console.error('Error logging in:',e);
            throw e;
        }
    }
    const handleUsernameChange=(e)=>{
        setUsername(e.target.value);
    }
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }
    return (
        <>
        <Toaster />
        <div className={styles.login_div}>
            <div className={styles.bg_div}>
            <div className={styles.login_second_div}>
                <h2>Login</h2>
                <form>
                    <div className={styles.input_div}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange}/>
                    </div>
                    <div className={styles.input_div}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <button type="submit" className={styles.login_btn} onClick={loginHandler}>Login</button>
                    <p className={styles.register_link}>
                        {"Don't have an account?"} <Link to={'/register'}>Register</Link>
                    </p>
                </form>
            </div>
            </div>
            
        </div>
        </>
    )
}

export default Login