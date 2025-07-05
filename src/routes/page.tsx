import { Button, Banner, Form, Modal, Typography } from '@douyinfe/semi-ui';

import { post as activate } from '@api/activate';
import { useLoading } from '../hooks';

import styles from './page.module.scss';

const tutorial = (
  <Typography.Text
    link={{
      href: 'https://docs.qq.com/aio/p/sc8axhs28s5bis8?p=5m0fAv5RoOObkSnOcYLfmQ',
      target: '_blank',
    }}
  >
    https://docs.qq.com/aio/p/sc8axhs28s5bis8?p=5m0fAv5RoOObkSnOcYLfmQ
  </Typography.Text>
);

function IndexPage(): JSX.Element {
  const [handleActivate, loading] = useLoading(async values => {
    const { code, message, data } = await activate({
      data: values,
    });

    if (code === 0) {
      Modal.success({
        title: message,
        content: (
          <>
            <span>
              可正常使用比亚迪定制版地图
              {data?.activationTime
                ? `，最后一次激活时间：${data.activationTime}`
                : ''}
              {data?.activateCount
                ? `，激活次数：${data.activateCount} 次`
                : ''}
              。地图使用教程：
            </span>
            {tutorial}
          </>
        ),
        cancelButtonProps: {
          style: {
            display: 'none',
          },
        },
      });
    } else if (code === 3001) {
      Modal.success({
        title: message,
        content: (
          <>
            <span>
              虽然查询到你的设备仍在黑名单中，但目前激活限制已经解除，你可以安装【高德地图定制版】正常使用，再来查询激活状态会变为【未激活】。地图使用教程：
            </span>
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
    <div className={styles.container}>
      <Banner
        className={styles.banner}
        type="warning"
        description={
          <>
            <span>
              自2025年6月13日起激活黑名单已解除，之前查询结果是激活黑名单的用户可正常使用【高德地图定制版】。查看详细说明：
            </span>
            <a
              href="https://mp.weixin.qq.com/s/ffAwZvk_j6PHl28SrWbrgw"
              target="_blank"
            >
              https://mp.weixin.qq.com/s/ffAwZvk_j6PHl28SrWbrgw
            </a>
          </>
        }
        closeIcon={null}
      />
      <Banner
        className={styles.banner}
        type="info"
        description="由于限制已经解除，本站的激活查询功能已完成其历史使命。计划于2025年7月15日下线，网站仅保留地图使用教程的入口，感谢各位车友的陪伴"
        closeIcon={null}
      />
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
    </div>
  );
}

export default IndexPage;
