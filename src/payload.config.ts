import { buildConfig } from 'payload/config';
import path from 'path';
// import Examples from './collections/Examples';
import Users from './collections/Users';
import Places from './collections/Places';
import Media from './collections/Media';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';

const adapter = s3Adapter({
  config: {
    forcePathStyle: true,
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    }
  },
  bucket: process.env.S3_BUCKET,
})

export default buildConfig({
  // serverURL: process.env.SERVER_URL,
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Places,
    Media
    // Add Collections here
    // Examples,
  ],
  localization: {
    locales: [
      'en',
      'it',
      'fr',
    ],
    defaultLocale: 'it',
    fallback: true,
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: ["*", "http://localhost:3001", "http://nextjs"],
  csrf: [ // whitelist of domains to allow cookie auth from
    'http://localhost:3001', "http://nextjs"
  ],
  plugins: [
    cloudStorage({
      collections: {
        'media': {
          adapter, // see docs for the adapter you want to use
          // disablePayloadAccessControl: true,
          // generateFileURL: (args) => process.env.S3_ENDPOINT + "/" + args.filename
        },
      },
    }),
  ],
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  }
});
