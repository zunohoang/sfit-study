import { AlertTriangle } from 'lucide-react'
import styles from './maintenance.module.css'

export default function MaintenancePage() {
  return (
    <div className={styles.maintenanceContainer}>
      <div className={styles.maintenanceCard}>
        <div className={styles.iconContainer}>
          <div className={styles.iconCircle}>
            <AlertTriangle className={styles.alertIcon} />
          </div>
        </div>
        
        <h1 className={styles.maintenanceTitle}>
          Hệ thống đang bảo trì
        </h1>
        
        <p className={styles.maintenanceMessage}>
          Chúng tôi đang nâng cấp hệ thống để mang đến trải nghiệm tốt hơn cho bạn.
          Vui lòng quay lại sau.
        </p>
        
        <div className={styles.maintenanceTime}>
          Dự kiến hoàn thành: <span className={styles.timeValue}>18:00 - 20/03/2025</span>
        </div>
      </div>
      
      <div className={styles.supportInfo}>
        <p>Nếu cần hỗ trợ, vui lòng liên hệ: <a href="https://www.facebook.com/zunohoang" className={styles.supportLink}>zunohoang</a></p>
      </div>
    </div>
  )
}
