import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    create: (): boolean => true, // Everyone can read Media
    read: (): boolean => true, // Everyone can read Media
    update: (): boolean => true, // Everyone can read Media
    delete: (): boolean => true, // Everyone can read Media
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    disableLocalStorage: true,
  }
}

export default Media