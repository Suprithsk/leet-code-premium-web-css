
import GradientDiv from '../../pages/GradientDiv/GradientDiv'
import CompanyFilter from '../CompanyFilter/CompanyFilter'
import Filter from '../Filter/Filter'
import styles from './HomePage.module.css'

function HomePage() {
  return (
    <div className={styles.homepage_div}>
        <h3>Welcome, Suprith S K</h3>
        <GradientDiv />
        <Filter />
        <CompanyFilter  />
    </div>
  )
}

export default HomePage