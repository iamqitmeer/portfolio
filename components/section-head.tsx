type Props = {
  id: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
};

/** Big heading on the left, a short supporting line bottom-right. */
export default function SectionHead({ id, title, aside }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:items-end">
      <h2 id={id} className="h-section md:col-span-7">
        {title}
      </h2>
      {aside ? (
        <p className="max-w-[32rem] text-[1.125rem] leading-[1.6] text-dim md:col-span-5 md:justify-self-end">
          {aside}
        </p>
      ) : null}
    </div>
  );
}
