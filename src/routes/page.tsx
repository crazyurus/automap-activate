import { Tabs, TabPane, Banner } from '@douyinfe/semi-ui';
import { useRef, useState } from 'react';

import { TUTORIAL_URL } from '../constants';
import styles from './page.module.scss';
import QueryTab from './components/query';

function IndexPage(): JSX.Element {
  const [activeTab, setActivateTab] = useState('query');
  const lastActiveTab = useRef('query');

  const handleClick = (key: string) => {
    if (key === 'tutorial') {
      window.open(TUTORIAL_URL, '_blank', 'noreferrer noopener');

      setActivateTab(lastActiveTab.current);
    } else {
      setActivateTab(key);

      lastActiveTab.current = key;
    }
  };

  return (
    <div className={styles.container}>
      <Banner
        className={styles.banner}
        type="info"
        description="由于地图激活的限制重新出现，本站的查询功能现已继续提供服务"
        closeIcon={null}
      />
      <Tabs activeKey={activeTab} type="line" onTabClick={handleClick}>
        <TabPane tab="激活查询" itemKey="query">
          <QueryTab />
        </TabPane>
        <TabPane tab="使用教程" itemKey="tutorial" />
      </Tabs>
    </div>
  );
}

export default IndexPage;
