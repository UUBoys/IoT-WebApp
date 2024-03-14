/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const fileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileCount: 2 } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof fileRouter;
