import { CollectionConfig } from 'payload/types';

const Places: CollectionConfig = {
    slug: 'place',
    versions: {
        drafts: true
    },
    access: {
        read: (): boolean => true, // Everyone can read Pages
    },
    fields: [
        {
            name: "place_name",
            type: 'text',
            label: 'place name',
        },
        {
            name: "text",
            type: 'richText',
            label: 'Main text',
        },
        {
            name: "address",
            type: 'text',
            label: 'Address',
        },
        {
          name: 'place_media', // required
          type: 'upload', // required
          relationTo: 'media', // required
          required: true,
          label: 'Media',
        },
        {
            name: 'location',
            type: 'point',
            label: 'Location',
        },
        {
            name: 'date',
            type: 'date',
            label: 'Creation date',
        }
    ]
}

export default Places;