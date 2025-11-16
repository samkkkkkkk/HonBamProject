import { Spinner } from 'reactstrap';
import '@/util/Loading.scss';

const LoadingPage = () => {
  return (
    <div className="loading">
      <Spinner color="danger">loading...</Spinner>
    </div>
  );
};

export default LoadingPage;
