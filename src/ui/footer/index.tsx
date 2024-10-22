import { getSite } from '@/lib/sanity/queries';
import Social from '@/ui/Social';
import Link from 'next/link';
import Img from '../Img';
import CustomPortableText from '../modules/CustomPortableText';
import Navigation from './Navigation';

export default async function Footer() {
  const { title, logo, copyright } = await getSite();

  const logoImage = logo?.image?.light || logo?.image?.default;

  return (
    <footer className="bg-ink text-center text-canvas">
      <div className="section border-b border-canvas/20 pb-4 pt-6">
        <div className="mx-auto max-w-screen-xl space-y-8">
          <div className="flex flex-wrap justify-between gap-y-8">
            <Link className="h3 md:h2 max-w-max" href="/">
              {logoImage ? (
                <Img
                  className="max-h-[1.5em] w-auto"
                  image={logoImage}
                  alt={logo?.name || title}
                />
              ) : (
                title
              )}
            </Link>

            <div className="ml-auto flex flex-col items-end gap-3">
              <Navigation />
              <Social />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 p-2 text-sm">
        &copy; {new Date().getFullYear()}{' '}
        {copyright ? <CustomPortableText value={copyright} /> : title}
      </div>
    </footer>
  );
}
