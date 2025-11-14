import React, { useState } from 'react';
import styles from './FeedTabs.module.css';
import FeedPage from '@/pages/FeedPage';
import MyFeedPage from '@/pages/MyFeedPage';
import ExploreFeedPage from '@/pages/ExploreFeedPage';

const FeedTabs = () => {
  const [tab, setTab] = useState('feed');

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        <button
          className={tab === 'feed' ? styles.active : ''}
          onClick={() => setTab('feed')}
        >
          피드
        </button>
        <button
          className={tab === 'my' ? styles.active : ''}
          onClick={() => setTab('my')}
        >
          내 글
        </button>
        <button
          className={tab === 'explore' ? styles.active : ''}
          onClick={() => setTab('explore')}
        >
          탐색
        </button>
      </div>

      <div className={styles.content}>
        {tab === 'feed' && <FeedPage />}
        {tab === 'my' && <MyFeedPage />}
        {tab === 'explore' && <ExploreFeedPage />}
      </div>
    </div>
  );
};

export default FeedTabs;
