import { defineConfig } from 'sanity';
import { BASE_URL, projectId } from './src/env';
import { structureTool } from 'sanity/structure';
import structure from './src/structure';
import { locations } from './src/presentation';
import { presentationTool } from 'sanity/presentation';
import {
  dashboardTool,
  projectInfoWidget,
  projectUsersWidget,
} from '@sanity/dashboard';
import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './schemas';
import Icon from './Icon';
import { simplerColorInput } from 'sanity-plugin-simpler-color-input';
import { theme } from 'https://themer.sanity.build/api/hues?default=4a47af;200;darkest:000000&primary=ec6c4f;darkest:111111&transparent=d2d1d2;100&positive=724fb7;300&caution=e7a138;200&critical=e06978;300&lightest=f5e8c9&darkest=111';

const singletonTypes = ['site'];

export default defineConfig({
  name: 'default',
  title: 'NVLV Studio CMS',
  icon: Icon,

  projectId,
  dataset: 'production',
  basePath: '/admin',

  theme,

  plugins: [
    structureTool({
      title: 'Content',
      structure,
    }),
    presentationTool({
      title: 'Editor',
      previewUrl: {
        draftMode: {
          enable: `${BASE_URL}/api/draft`,
        },
      },
      resolve: { locations },
    }),
    dashboardTool({
      title: 'Deployment',
      widgets: [projectInfoWidget(), projectUsersWidget(), vercelWidget()],
    }),
    visionTool({ title: 'GROQ' }),
    codeInput(),
    simplerColorInput({
      // Note: These are all optional
      defaultColorFormat: 'hex',
      defaultColorList: [
        { label: 'Red', value: '#EC6C4F' },
        { label: 'Violet', value: '#4A47AF' },
        { label: 'Beige', value: '#F5E8C9' },
        { label: 'Black', value: '#000000' },
        { label: 'White', value: '#FFFFFF' },
        { label: 'Alternative Violet', value: '#724FB7' },
        { label: 'Alternative Orange', value: '#E7A138' },
        { label: 'Alternative Pink', value: '#E06976' },
        { label: 'Custom...', value: 'custom' },
      ],
      enableSearch: true,
    }),
  ],

  scheduledPublishing: {
    enabled: false,
  },

  schema: {
    // @ts-ignore defineArrayMember seems to not add the name property which results in an error
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => !singletonTypes.includes(schemaType),
      ),
  },

  document: {
    actions: (input, { schemaType }) =>
      singletonTypes.includes(schemaType)
        ? input.filter(
            ({ action }) =>
              action &&
              ['publish', 'discardChanges', 'restore'].includes(action),
          )
        : input,
  },
});
