import type { RequestOption } from '@modern-js/runtime/server';

export async function post(
  context: RequestOption<
    never,
    { phone: string; vin: string; mapType: number }
  >,
) {
  const { phone, vin, mapType } = context.data;

  if (mapType !== 1) {
    return {
      code: -1,
      message: '仅支持查询高德地图定制版激活状态',
      data: null,
    };
  }

  if (!/^1\d{10}$/.test(phone)) {
    return {
      code: -1,
      message: '本机号码格式不正确',
      data: null,
    };
  }

  if (!/^\d{6}$/.test(vin)) {
    return {
      code: -1,
      message: '车架号后 6 位格式不正确',
      data: null,
    };
  }

  try {
    const response = await fetch(process.env.BYD_MAP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        localNum: phone,
        mapType,
      }),
    });
    const { code, success, message, result } = await response.json();

    if (success) {
      if (!result.vin || result.vin.slice(-6) === vin) {
        return {
          code: 0,
          message: result.state,
          data: {},
        };
      } else {
        return {
          code: -2,
          message: '车架号后 6 位与本机号码不匹配',
          data: null,
        };
      }
    }

    return {
      code,
      message,
      data: null,
    };
  } catch (e) {
    return {
      code: -1,
      message: '查询失败，请稍后再试',
      data: null,
    };
  }
}
