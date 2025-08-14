import { Button, Form, Modal, Typography } from '@douyinfe/semi-ui';

import { post as activate } from '@api/activate';
import { useLoading } from '../../../hooks';
import { TUTORIAL_URL } from '../../../constants';

import styles from './index.module.scss';

const tutorial = (
  <Typography.Text
    link={{
      href: TUTORIAL_URL,
      target: '_blank',
    }}
  >
    {TUTORIAL_URL}
  </Typography.Text>
);

function QueryTab(): JSX.Element {
  const [handleActivate, loading] = useLoading(async values => {
    const { code, message } = await activate({
      data: values,
    });

    if (code === 0) {
      Modal.success({
        title: message,
        content: (
          <>
            <span>可正常使用比亚迪定制版地图。地图使用教程：</span>
            {tutorial}
          </>
        ),
        cancelButtonProps: {
          style: {
            display: 'none',
          },
        },
      });
    } else {
      Modal.error({
        title: message,
        content: code > 0 ? '以上查询结果仅供参考' : undefined,
        cancelButtonProps: {
          style: {
            display: 'none',
          },
        },
      });
    }
  });

  return (
    <>
      <div className={styles.tutorial}>
        <span>比亚迪定制版地图使用教程：</span>
        {tutorial}
      </div>
      <Form onSubmit={values => handleActivate(values)}>
        <Form.Input
          field="phone"
          label="车联网卡号/本机号码"
          type="tel"
          placeholder="可在比亚迪 App 的 SIM 卡实名认证或车机的版本信息中查看，例如：14888888888"
          maxLength={11}
          required
          rules={[
            {
              pattern: /^1\d{10}$/,
              message: '请输入正确的本机号码',
            },
          ]}
        />
        <Form.Input
          field="vin"
          label="车架号后 6 位"
          type="tel"
          placeholder="可在比亚迪 App 的 SIM 卡实名认证中查看"
          extraText="仅提供查询激活状态服务"
          maxLength={6}
          required
          rules={[
            {
              pattern: /^\d{6}$/,
              message: '请输入正确的车架号后 6 位',
            },
          ]}
        />
        <div className={styles.footer}>
          <Button
            htmlType="submit"
            loading={loading}
            type="primary"
            theme="solid"
          >
            查询
          </Button>
        </div>
      </Form>
    </>
  );
}

export default QueryTab;
