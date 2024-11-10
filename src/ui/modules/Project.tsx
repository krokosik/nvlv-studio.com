import { stegaClean } from '@sanity/client/stega';

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
  gallery: any;
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
      className="grid-cols-32 mb-[var(--header-height)] grid h-screen max-h-fold w-full grid-rows-3 px-20"
      style={{
        backgroundColor: colors.backgroundColor,
      }}
    >
      <div className="col-span-full row-span-2 grid grid-cols-subgrid divide-x divide-black">
        <div className="col-span-9"></div>
        <div className="col-span-11 size-full"></div>
        <div className="col-span-11 size-full"></div>
        <div className="col-span-1"></div>
      </div>
      <div className="col-span-full grid grid-cols-subgrid">
        <div className="col-span-22 col-start-10 size-full"></div>
      </div>
    </section>
  );
}
