import { cn } from '@/lib/utils';
import { stegaClean } from '@sanity/client/stega';

export default function Pretitle({
  className,
  children,
  style,
}: React.HTMLProps<HTMLParagraphElement>) {
  if (!children) return null;

  return (
    <p className={cn('technical', className)} style={style}>
      {stegaClean(children)}
    </p>
  );
}
