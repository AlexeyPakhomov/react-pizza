import ContentLoader from 'react-content-loader';
import style from './Skeleton.module.scss';

const Skeleton: React.FC = () => (
  <ContentLoader
    className={style.skeleton}
    speed={10}
    width={280}
    height={465}
    viewBox="0 0 280 464"
    backgroundColor="#ebebeb"
    foregroundColor="#ffffff"
    //{...props}
  >
    <circle cx="138" cy="111" r="111" />
    <rect x="0" y="307" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="435" rx="10" ry="10" width="90" height="27" />
    <rect x="128" y="417" rx="30" ry="30" width="152" height="45" />
    <rect x="0" y="250" rx="0" ry="0" width="280" height="43" />
  </ContentLoader>
);

export default Skeleton;
