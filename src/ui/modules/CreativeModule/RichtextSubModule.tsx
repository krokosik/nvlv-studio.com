import CustomPortableText from '../CustomPortableText';

export type RichtextSubModuleType = Sanity.Module<'richtext'> &
  Partial<{
    content: any;
  }>;

export default function RichtextSubModule({
  module,
}: {
  module: RichtextSubModuleType;
}) {
  return (
    <div className="richtext">
      <CustomPortableText value={module.content} />
    </div>
  );
}
