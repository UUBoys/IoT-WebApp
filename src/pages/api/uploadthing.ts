/* eslint-disable import/no-unresolved */
import { createNextPageApiHandler } from "uploadthing/next-legacy";

import { fileRouter } from "../../server/uploadthing";

const handler = createNextPageApiHandler({
  router: fileRouter,
});

export default handler;
