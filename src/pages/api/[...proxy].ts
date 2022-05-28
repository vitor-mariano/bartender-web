import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiHandler } from "next";
import { getAxiosInstance } from "src/app/shared/providers/api";

const handler: NextApiHandler = withApiAuthRequired(async (req, res) => {
  const url = (req.query.proxy as string[]).join("/");
  const { accessToken } = await getAccessToken(req, res);
  const http = getAxiosInstance(accessToken);

  try {
    const result = await http.request({
      url,
      method: req.method,
      data: req.body,
    });

    res.status(result.status).json(result.data);
  } catch (error: any) {
    res.status(error.response?.status ?? 500).json(error.response?.data ?? {});
  }
});

export default handler;
