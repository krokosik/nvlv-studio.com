import { defineArrayMember } from 'sanity';

export default defineArrayMember({
  name: 'custom-block',
  type: 'block',
  marks: {
    annotations: [{ type: 'textColor' }, { type: 'highlightColor' }],
  },
});
