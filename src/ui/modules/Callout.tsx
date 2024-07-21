import CTAList from '@/ui/CTAList';
import CustomPortableText from './CustomPortableText';

export default function Callout({
  content,
  ctas,
}: Partial<{
  content: any;
  ctas: Sanity.CTA[];
}>) {
  return (
    <section className="section">
      <div className="section grid max-w-screen-lg items-center gap-12 gap-y-6 rounded bg-accent/5 md:grid-cols-[2fr,1fr]">
        <div className="richtext">
          <CustomPortableText value={content} />
        </div>

        <CTAList ctas={ctas} />
      </div>
    </section>
  );
}
