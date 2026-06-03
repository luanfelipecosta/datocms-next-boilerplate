import path from 'node:path';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { buildConfig } from 'payload';
import { Posts } from './collections/Posts';
import { SiteSettings } from './globals/SiteSettings';

const databaseUrl = process.env.DATABASE_URL ?? 'file:./.payload/payload.db';
const serverUrl = process.env.SERVER_URL ?? 'http://localhost:3001';

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET ?? 'change-me-in-production',
  serverURL: serverUrl,
  graphQL: {
    disable: true
  },
  db: sqliteAdapter({
    client: {
      url: databaseUrl
    }
  }),
  collections: [Posts],
  globals: [SiteSettings],
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts')
  },
  admin: {
    meta: {
      titleSuffix: ' | CMS'
    }
  }
});
