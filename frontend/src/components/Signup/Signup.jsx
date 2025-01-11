import styles from './Signup.module.css'
import { Link } from 'react-router-dom'
function Signup() {

    return (
        <div className={styles.login_div}>
                    <div className={styles.bg_div}>
                    <div className={styles.login_second_div}>
                        <h2>Sign up</h2>
                        <form>
                            <div className={styles.input_div}>
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" />
                            </div>
                            <div className={styles.input_div}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" />
                            </div>
                            <div className={styles.input_div}>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" />
                            </div>
                            <button type="submit" className={styles.login_btn}>Sign Up</button>
                            <p className={styles.register_link}>
                                {"Already a user?"} <Link to={'/login'}>Login</Link>
                            </p>
                        </form>
                    </div>
                    </div>
                    
                </div>
    )
}

export default Signup