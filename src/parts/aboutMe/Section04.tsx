import { css } from '../../../styled-system/css'
import { motion } from 'framer-motion'
import PageTransition from '../../templates/PageAnimation'

const Section04 = ({ showSection04 }) => {
  const childVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
    exit: { x: 50, opacity: 0, transition: { duration: 0.8 } },
  }
  const childVariantsButton = {
    hidden: { x: 0, y: 50, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1, transition: { duration: 0.8 } },
    exit: { x: 50, opacity: 0, transition: { duration: 0.8 } },
  }

  return (
    <div className={StyledInfoWrapper}>
      <PageTransition transition={showSection04}>
        <motion.div variants={childVariants} className={StyledCategory}>
          Career Profile 2.3y
        </motion.div>
        <motion.h1 variants={childVariants} className={StyledTitle}>
          {`PROJECTS`}
        </motion.h1>
        <motion.article variants={childVariants} className={StyledText}>
          <motion.div>
            <h3>2024.11 ~ 2024.01</h3>
            <h2>Solariant 사내 채용 모집 공고 및 관리 서비스 개발</h2>
            <p>Illuminarean</p>
            <ul>
              <li className={StyledList}>{`react-query 및 react-hook-form을 사용한 모집 공고 지원 신청 폼 개발`}</li>
              <li className={StyledList}>Next14 채용 관리 서비스 SSG 다국어 지원 적용 및 Dockerization</li>
            </ul>
          </motion.div>
          <div className={StyledLine} />
          <motion.div>
            <h3>2024.07 ~ 2024.12</h3>
            <h2>프론트엔드 도커라이제이션 및 CI/CD 최적화</h2>
            <p>Illuminarean</p>
            <ul>
              <li className={StyledList}>
                {
                  'DevOps팀과의 협업을 통한 프론트엔드 CI Dockerization 진행을 통해 배포 소요 시간을 16분에서 3분으로 단축'
                }
              </li>
              <li className={StyledList}>{'Docker 환경변수 URL 방식 적용 이미지 재사용성 향상'}</li>
              <li className={StyledList}>{'사내 Docker 도입 및 적용 방법 교육 진행'}</li>
            </ul>
          </motion.div>

          <div className={StyledLine} />
          <motion.div>
            <h3>2023.01 ~ 2023.11</h3>
            <h2>Development of Smart Factory Monitoring System in Serbia's Automotive Industry</h2>
            <p>YURA R&D Center</p>
            <ul>
              <li
                className={StyledList}
              >{`Led the development of the monitoring system's React frontend using Figma for UI/UX design and React Apex Chart for production monitoring pages.`}</li>
              <li className={StyledList}>
                Developed backend APIs using Java Spring Boot and MariaDB for production tracking
              </li>
              <li className={StyledList}>
                Collaborated with local workers for system maintenance and improvements, reducing AOI defect rates by
                20% and enhancing production efficiency.
              </li>
            </ul>
          </motion.div>
        </motion.article>
      </PageTransition>
    </div>
  )
}
export default Section04

const StyledLine = css({
  borderBottom: '0.3rem solid',
  color: 'MainText',
  margin: '2rem 0 2rem 0',
})

const StyledList = css({
  listStyleType: 'disc',
  marginLeft: '1.5rem',
})

const StyledInfoWrapper = css({
  display: 'flex',
  width: '70%',
  flexDirection: 'column',
  padding: '5rem',
  color: 'MainText',
  gap: '1rem',
})

const StyledCategory = css({
  fontSize: '1.5rem',
  lineHeight: '0.1rem',
  color: 'MainText',
})

const StyledTitle = css({
  fontSize: '5rem',
  lineHeight: '100%',
  color: 'MainText',
})

const StyledText = css({
  fontSize: '1.5rem',
  color: 'MainText',
})
