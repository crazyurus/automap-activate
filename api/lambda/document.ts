interface Document {
  id: string;
  title: string;
  content: string;
}

export async function get(): Promise<{
  code: number;
  message: string;
  data: {
    documents: Document[];
  };
}> {
  try {
    const response = await fetch(process.env.BYD_DOCUMENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { code, message, success, result } = await response.json();

    if (success) {
      return {
        code: 0,
        message,
        data: {
          documents: result.map((item: any) => ({
            id: item.id,
            title: item.minTitle,
            content: item.htmlnight,
          })) satisfies Document[],
        },
      };
    } else {
      return {
        code,
        message,
        data: {
          documents: [],
        },
      };
    }
  } catch (e) {
    return {
      code: -1,
      message: '查询失败，请稍后再试',
      data: {
        documents: [],
      },
    };
  }
}
