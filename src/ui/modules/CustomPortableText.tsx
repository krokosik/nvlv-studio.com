import {
  PortableText,
  PortableTextMarkComponentProps,
  PortableTextProps,
} from 'next-sanity';

export default function CustomPortableText({
  components,
  ...props
}: PortableTextProps) {
  return (
    <PortableText
      components={{
        ...(components ?? {}),
        marks: {
          textColor: ({ children, value }: PortableTextMarkComponentProps) => (
            <span
              style={{
                color: (value?.value as string | undefined)?.slice(0, 7),
              }}
            >
              {children}
            </span>
          ),
          highlightColor: ({
            children,
            value,
          }: PortableTextMarkComponentProps) => (
            <span
              style={{
                backgroundColor: (value?.value as string | undefined)?.slice(
                  0,
                  7,
                ),
              }}
            >
              {children}
            </span>
          ),
        },
      }}
      {...props}
    />
  );
}
