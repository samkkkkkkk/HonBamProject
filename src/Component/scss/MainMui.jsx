// styles.js
import { makeStyles } from '@mui/styles';
import main1 from '@/assets/komarov-egor-yp20k9i_mZ4-unsplash.jpg';
import recipe from '@/assets/ambitious-studio-rick-barrett-QjUY7auDzUQ-unsplash.jpg';

export const useStyles = makeStyles({
  /** 전체 뷰포트 — 가로·세로 단위를 올바르게 수정 */
  mainContainer: {
    // ✅ 오타(mainContiner → mainContainer)
    width: '100vw', // ✅ 100vh → 100vw
    height: '100vh',
  },

  /** 첫 화면 배경 */
  mainBack: {
    backgroundImage: `url(${main1})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh',
  },

  /** 인트로 텍스트 영역 */
  mainIntroMui: {
    position: 'relative',
    left: '15%',
    top: '25%',
    width: '60%',
  },

  /** 레시피 섹션 */
  mainRecipeMui: {
    // ✅ 카멜케이스 맞춤(mainrecipeMui → mainRecipeMui)
    backgroundImage: `url(${recipe})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100%', // 100%는 부모 높이에 의존 → 필요하면 100vh로 고정
  },

  /** 어두운 오버레이 */
  mainColor: {
    // ✅ 카멜케이스(maincolor → mainColor)
    width: '100vw',
    height: '100vh',
    backgroundColor: '#27262b',
  },

  /** 오늘의 추천 위치 */
  mainToday: {
    position: 'relative',
    top: '50%', // 가운데 정렬이 목적이면 transform 추가 권장
  },
});
