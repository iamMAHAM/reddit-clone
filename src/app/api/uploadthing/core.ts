import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    // @ts-ignore
    // eslint-disable-next-line no-unused-vars
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = { id: 1 };

      // If you throw, the user will not be able to upload
      if (!user) throw new Error('Unauthorized');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
