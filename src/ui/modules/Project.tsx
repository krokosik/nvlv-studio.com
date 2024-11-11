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
  description: string;
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
      }}
    >
      <div className="col-span-full row-span-2 grid h-full grid-cols-subgrid divide-x divide-black">
        <div className="col-span-7"></div>
        <div className="col-span-12 p-2">
          <Carousel
            opts={{
              loop: true,
              align: 'center',
            }}
          >
            <CarouselContent className="items-center">
              {gallery?.images.map((image) => (
                <CarouselItem className="basis-2/3">
                  <figure className="relative max-h-[58svh] w-full">
                    <Img image={image} />
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots />
          </Carousel>
        </div>
        <div className="col-span-12 size-full"></div>
        <div className="col-span-1"></div>
      </div>
      <div className="col-span-full grid grid-cols-subgrid">
        <div className="col-span-24 col-start-8 size-full"></div>
      </div>
    </section>
  );
}
