import { makeStyles } from '@mui/styles';
import main1 from '../../assets/komarov-egor-yp20k9i_mZ4-unsplash.jpg';
import recipe from '../../assets/ambitious-studio-rick-barrett-QjUY7auDzUQ-unsplash.jpg';
export const useStyles = makeStyles({
  mainContiner: {
    width: '100vh',
    height: '100vh',
  },
  mainBack: {
    backgroundImage: `url(${main1})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    width: '100%',
  },
  mainIntro: {
    position: 'relative',
    left: '15%',
    top: '25%',
  },
  mainrecipe: {
    backgroundImage: `url(${recipe})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    width: '100vw',
  },
  maincolor: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#27262b',
  },
  typo: {
    position: 'relative',
    left: '30%',
    color: '#ffffff',
    fontFamily: 'Inter-Medium',
    fontSize: '20px',
    fontWeight: '500',
  },
  mainArrow: {
    position: 'relative',
    // left: '70%',
  },
});
