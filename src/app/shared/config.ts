import * as Yup from "yup";
import mergeDeepRight from "ramda/src/mergeDeepRight";

const publicConfigSchema = Yup.object({
  api: Yup.object({
    url: Yup.string().required(),
  }),
});

export const getPublicConfig = () =>
  publicConfigSchema.validateSync({
    api: {
      url: process.env.NEXT_PUBLIC_API_URL,
    },
  });

const configSchema = Yup.object({
  auth0: Yup.object({
    audience: Yup.string().required(),
    scope: Yup.string().required(),
  }),
}).required();

export const getConfig = () =>
  mergeDeepRight(
    getPublicConfig(),
    configSchema.validateSync({
      auth0: {
        audience: process.env.AUTH0_AUDIENCE,
        scope: process.env.AUTH0_SCOPE,
      },
    })
  );
