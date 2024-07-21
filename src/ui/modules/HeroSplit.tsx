import { cn } from '@/lib/utils';
import CTAList from '@/ui/CTAList';
import Img from '@/ui/Img';
import Pretitle from '@/ui/Pretitle';
import CustomPortableText from './CustomPortableText';

export default function HeroSplit({
  pretitle,
  content,
  ctas,
  image,
}: Partial<{
  pretitle: string;
  content: any;
  ctas: Sanity.CTA[];
  image: Sanity.Image & { onRight?: boolean };
}>) {
  return (
    <section className="section grid items-center gap-8 md:grid-cols-2 md:gap-x-12">
      <figure
        className={cn('max-md:full-bleed', image?.onRight && 'md:order-1')}
      >
        <Img image={image} imageWidth={1200} />
      </figure>

      <div className="richtext mx-auto w-full max-w-lg [&_:is(h1,h2)]:text-balance">
        <Pretitle>{pretitle}</Pretitle>
        <CustomPortableText value={content} />
        <CTAList ctas={ctas} className="!mt-4" />
      </div>
    </section>
  );
}
