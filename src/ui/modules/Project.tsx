import { stegaClean } from '@sanity/client/stega';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';
import Img from '../Img';
import CustomPortableText from './CustomPortableText';

export default function Project({
  title,
  pretitle,
  description,
  gallery,
  textColor,
  backgroundColor,
  accentColor,
}: Partial<{
  title: string;
  pretitle: string;
  description: any;
  gallery: { images: any[] };
  textColor: any;
  backgroundColor: any;
  accentColor: any;
}>) {
  const colors = {
    textColor: stegaClean(textColor.value) as string,
    backgroundColor: stegaClean(backgroundColor.value) as string,
    accentColor: stegaClean(accentColor.value) as string,
  };

  return (
    <section
      className="mb-[var(--header-height)] grid h-screen max-h-fold w-full grid-cols-32 grid-rows-3 px-20"
      style={{
        backgroundColor: colors.backgroundColor,
        color: colors.textColor,
      }}
    >
      <div className="col-span-full row-span-2 grid h-full grid-cols-subgrid divide-x divide-black">
        <div className="col-span-7"></div>
        <div className="col-span-12 p-2">
          <Carousel opts={{ loop: true }}>
            <CarouselContent className="items-center">
              {gallery?.images.map((image) => (
                <CarouselItem key={image._key} className="basis-2/3">
                  <figure className="relative max-h-[58svh] w-full">
                    <Img image={image} />
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots />
          </Carousel>
        </div>
        <div className="col-span-12 size-full px-4">
          <div className="flex size-full flex-col justify-center">
            <CustomPortableText value={description} />
          </div>
        </div>
        <div className="col-span-1" />
      </div>
      <div className="col-span-full grid grid-cols-subgrid grid-rows-3">
        <div className="col-span-12 col-start-8 row-span-3 grid size-full grid-rows-subgrid text-6xl font-medium">
          <span className="self-end" style={{ color: colors.accentColor }}>
            //:
          </span>
          <h3 className="row-span-2">
            {title?.split(' ')[0]}
            <span style={{ color: colors.accentColor }}>:</span>
            <br />
            {title?.split(' ')[1]}
            <span style={{ color: colors.accentColor }}>.01</span>
          </h3>
        </div>
        <div className="col-start-20 col-span-12 row-span-2 row-start-2">
          {pretitle}
        </div>
      </div>
    </section>
  );
}
