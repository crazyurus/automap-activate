import type { RequestOption } from '@modern-js/runtime/server';

export async function post(context: RequestOption<never, { phone: string }>) {
  const { phone } = context.data;

  if (!/^1\d{10}$/.test(phone)) {
    return {
      code: -1,
      message: '本机号码格式不正确',
      data: null,
    };
  }

  const response = await fetch(process.env.BYD_MAP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      localNum: phone,
    }),
  });
  const { code, success, message, result } = await response.json();

  if (success) {
    return {
      code: 0,
      message: result.state,
      data: {},
    };
  }

  return {
    code,
    message,
    data: null,
  };
}
