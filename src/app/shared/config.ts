import * as Yup from "yup";

const configSchema = Yup.object({
  api: Yup.object({
    url: Yup.string().required(),
  }),
  auth0: Yup.object({
    audience: Yup.string().required(),
    scope: Yup.string().required(),
  }),
}).required();

export const getConfig = () =>
  configSchema.validateSync({
    api: {
      url: process.env.NEXT_PUBLIC_API_URL,
    },
    auth0: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: process.env.AUTH0_SCOPE,
    },
  });
