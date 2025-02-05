import { Button, Form, Modal, Typography } from '@douyinfe/semi-ui';

import { post as activate } from '@api/activate';
import { useLoading } from '../hooks';

import styles from './page.module.scss';

function IndexPage(): JSX.Element {
  const [handleActivate, loading] = useLoading(async (phone: string) => {
    const { code, message } = await activate({
      data: {
        phone,
      },
    });

    if (code === 0) {
      Modal.success({
        title: message,
        content: (
          <>
            <span>可正常使用高德地图定制版，使用教程：</span>
            <Typography.Text
              link={{
                href: 'https://docs.qq.com/aio/p/sc8axhs28s5bis8?p=5m0fAv5RoOObkSnOcYLfmQ',
                target: '_blank',
              }}
            >
              https://docs.qq.com/aio/p/sc8axhs28s5bis8?p=5m0fAv5RoOObkSnOcYLfmQ
            </Typography.Text>
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
        content: '以上查询结果仅供参考',
        cancelButtonProps: {
          style: {
            display: 'none',
          },
        },
      });
    }
  });

  return (
    <div className={styles.container}>
      <Form onSubmit={values => handleActivate(values.phone)}>
        <Form.Input
          field="phone"
          label="车联网卡号/本机号码"
          placeholder="可在比亚迪 App 的实名认证或车机的版本信息中查看，例如：14888888888"
          extraText="仅提供查询激活状态服务"
          maxLength={11}
          required
          rules={[
            {
              pattern: /^1\d{10}$/,
              message: '请输入正确的本机号码',
            },
          ]}
        />
        <div>
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
    </div>
  );
}

export default IndexPage;
