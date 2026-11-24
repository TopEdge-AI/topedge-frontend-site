import { TopicBlockView, type TopicBlock } from '../topic/TopicBlocks';

/**
 * Topic blocks as framed rows: every block with a heading gets its own section
 * row, and callouts that follow one another share one row of cells.
 */
export default function FxBlocks({ blocks }: { blocks: TopicBlock[] }) {
  const rows: TopicBlock[][] = [];
  for (const b of blocks) {
    const last = rows[rows.length - 1];
    if (b.kind === 'callout' && last && last[0].kind === 'callout') last.push(b);
    else rows.push([b]);
  }

  return (
    <>
      {rows.map((row) =>
        row[0].kind === 'callout' ? (
          <div
            key={row[0].id}
            className={`mkt-jx__notes fx-cells${row.length > 1 ? ' fx-cells--2' : ' mkt-jx__notes--one'}`}
          >
            {row.map((b) => (
              <TopicBlockView key={b.id} block={b} />
            ))}
          </div>
        ) : (
          <div key={row[0].id} className="mkt-jx__blk fx-sec" data-kind={row[0].kind}>
            <TopicBlockView block={row[0]} />
          </div>
        ),
      )}
    </>
  );
}
