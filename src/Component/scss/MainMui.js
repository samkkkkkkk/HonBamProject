import { makeStyles } from '@mui/styles';
import main1 from '../../assets/komarov-egor-yp20k9i_mZ4-unsplash.jpg';

export const useStyles = makeStyles({
  mainContiner: {
    width: '100%',
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
});
