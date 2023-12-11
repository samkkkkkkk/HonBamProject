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
    height: '100vh',
    width: '100vw',
  },
  mainIntroMui: {
    position: 'relative',
    left: '15%',
    top: '25%',
    width: '60%',
  },
  mainrecipeMui: {
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

  mainToday: {
    position: 'relative',
    top: '50%',
  },
});
