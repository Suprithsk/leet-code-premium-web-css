
import styles from './Signup.module.css'

import { Link } from 'react-router-dom'
import { useState } from 'react';
import { register } from '../../apis/authService';
import { useNavigate } from 'react-router-dom';
import {Toaster, toast} from 'react-hot-toast'

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        if(!username || !email || !password){
            toast.error('Please fill all fields');
            return;
        }
        try{
            await toast.promise(
                handleSubmit({username,password,email}),
                {
                    loading:'Signing up...',
                    success:'Signup in successfully',
                    error:(e)=>{
                        if(e?.response?.data?.message){
                            return e.response.data.message;
                        }
                        return 'An error occurred'
                    }
                }
            )
        }catch(error){
            console.error('Error signing up:', error);
        }
    }
    const handleSubmit = async (userInfo) => {
        try {
            const response = await register(userInfo);
            console.log(response);
            navigate('/login');
        } catch (e) {
            console.error('Error signing up:', e);
            throw e;
        }
    }
    const onUserChangeHandler = (e) => {
        setUsername(e.target.value);
    }
    const onEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    }
    const onPasswordChangeHandler = (e) => {
        setPassword(e.target.value);
    }
    return (
        <>
        <Toaster />
        <div className={styles.login_div}>
                    <div className={styles.bg_div}>
                    <div className={styles.login_second_div}>
                        <h2>Sign up</h2>
                        <form>
                            <div className={styles.input_div}>
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" value={username} onChange={onUserChangeHandler} />
                            </div>
                            <div className={styles.input_div}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={email} onChange={onEmailChangeHandler} />
                            </div>
                            <div className={styles.input_div}>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" value={password} onChange={onPasswordChangeHandler} />
                            </div>
                            <button type="submit" className={styles.login_btn} onClick={submitHandler}>Sign Up</button>
                            <p className={styles.register_link}>
                                {"Already a user?"} <Link to={'/login'}>Login</Link>
                            </p>
                        </form>
                    </div>
                    </div>
                    
                </div>
                </>
    )
}

export default Signup