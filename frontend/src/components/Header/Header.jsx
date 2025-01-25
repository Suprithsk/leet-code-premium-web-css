import styles from "./Header.module.css";
import {useNavigate} from "react-router-dom";

function Header() {
    const token = localStorage.getItem("token");
    const navigate=useNavigate();
    const signInHandler = () => {
        navigate("/login");
    };
    const onSignOut=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <header className={styles.header}>
            <h3>Premium Code</h3>
            {token && (
                <div className={styles.profile_div}>
                    <button className={styles.signin_btn} onClick={onSignOut}>Sign Out</button>
                </div>
            )}
            {!token && <button className={styles.signin_btn} onClick={signInHandler}>Login</button>}
        </header>
    );
}

export default Header;
