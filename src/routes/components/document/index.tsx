/* eslint-disable react/no-danger */
import { TabPane } from '@douyinfe/semi-ui';

import { get as getDocuments } from '@api/document';

import useSWR from 'swr';

function DocumentTab(): JSX.Element[] | null {
  const { data: response } = useSWR('/api/document', getDocuments);

  return (
    response?.data.documents.map(item => (
      <TabPane key={item.id} tab={item.title} itemKey={item.id}>
        <div dangerouslySetInnerHTML={{ __html: item.content }} />
      </TabPane>
    )) || null
  );
}

export default DocumentTab;
