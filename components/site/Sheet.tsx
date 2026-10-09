// One page of the drawing set: a sticky sheet with a frame and a title block.
export default function Sheet({ id, no, title, tone, className = "", children }: {
  id: string; no: string; title: string; tone: "blue" | "paper"; className?: string; children: React.ReactNode;
}) {
  return <>
    {/* Anchors sit in normal flow so links and the nav never measure a stuck sheet. */}
    <div id={id} className="anchor" aria-hidden="true" />
    <section className={`sheet sheet--${tone} ${className}`} data-sheet={id} aria-labelledby={`${id}-title`}>
      <div className="frame" aria-hidden="true" />
      {children}
      <div className="title-block" aria-hidden="true">
        <div><span>Project</span><b>P. Charan — Portfolio</b></div>
        <div><span>Title</span><b>{title}</b></div>
        <div className="tb-sheet"><span>Sheet</span><b>{no}</b></div>
      </div>
    </section>
  </>;
}
