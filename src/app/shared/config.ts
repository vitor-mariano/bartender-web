import * as Yup from "yup";

const configSchema = Yup.object({
  api: Yup.object({
    url: Yup.string().required(),
  }),
}).required();

export const getConfig = () =>
  configSchema.validateSync({
    api: {
      url: process.env.NEXT_PUBLIC_API_URL,
    },
  });
