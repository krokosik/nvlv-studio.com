import { cn } from '@/lib/utils';
import CTAList from '@/ui/CTAList';
import Img, { Source } from '@/ui/Img';
import Pretitle from '@/ui/Pretitle';
import { stegaClean } from '@sanity/client/stega';
import CustomPortableText from './CustomPortableText';
import LogoCanvas from '../LogoCanvas/LogoCanvas';

export default function Hero({
  pretitle,
  content,
  ctas,
  enableOrbs,
  orbFill,
  orbBackground,
  bgImage,
  bgImageMobile,
  textAlign = 'center',
  alignItems,
}: Partial<{
  pretitle: string;
  content: any;
  ctas: Sanity.CTA[];
  enableOrbs: boolean;
  orbFill?: any;
  orbBackground?: any;
  bgImage: Sanity.Image;
  bgImageMobile: Sanity.Image;
  textAlign: React.CSSProperties['textAlign'];
  alignItems: React.CSSProperties['alignItems'];
}>) {
  const hasImage = !!bgImage?.asset || enableOrbs;
  const backgroundColor = hasImage && stegaClean(orbBackground?.value);
  const fillColor = stegaClean(orbFill?.value);

  return (
    <section
      className={cn(
        hasImage &&
          'grid overflow-hidden bg-ink text-canvas *:col-span-full *:row-span-full',
      )}
      style={{ backgroundColor }}
    >
      {!enableOrbs && bgImage?.asset && (
        <picture>
          <Source image={bgImageMobile} imageWidth={1200} />
          <Img
            className="size-full max-h-fold object-cover"
            image={bgImage}
            imageWidth={1800}
            draggable={false}
          />
        </picture>
      )}
      {enableOrbs && (
        <div className="mx-auto size-full max-h-fold max-w-7xl object-cover">
          <LogoCanvas
            fillColor={fillColor ?? 'transparent'}
            backgroundColor={backgroundColor ?? 'transparent'}
            square
          />
        </div>
      )}

      {content && (
        <div className="section flex w-full flex-col">
          <div
            className={cn(
              'richtext relative max-w-xl [&_:is(h1,h2)]:text-balance',
              bgImage?.asset && 'text-shadow',
              {
                'mb-8': stegaClean(alignItems) === 'start',
                'my-auto': stegaClean(alignItems) === 'center',
                'mt-auto': stegaClean(alignItems) === 'end',
              },
              {
                'mr-auto': stegaClean(textAlign) === 'left',
                'mx-auto': stegaClean(textAlign) === 'center',
                'ml-auto': stegaClean(textAlign) === 'right',
              },
            )}
            style={{ textAlign: stegaClean(textAlign) }}
          >
            <Pretitle className={cn(hasImage && 'text-canvas/70')}>
              {pretitle}
            </Pretitle>
            <CustomPortableText value={content} />
            <CTAList
              ctas={ctas}
              className={cn('!mt-4', {
                'justify-start': stegaClean(textAlign) === 'left',
                'justify-center': stegaClean(textAlign) === 'center',
                'justify-end': stegaClean(textAlign) === 'right',
              })}
            />
          </div>
        </div>
      )}
    </section>
  );
}
