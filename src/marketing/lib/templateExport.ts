import {
  FESTIVAL_MARKETING_RATE,
  stageSendWindow,
  type FestivalTemplateItem,
} from '../data/festivalTemplates';

/**
 * Copying and downloading templates.
 *
 * People searching for message templates are looking for text they can take
 * away, and a page that only renders a preview makes them select it by hand out
 * of a styled bubble — which drags in the timestamp, the footer and the button
 * label as one unusable blob. A copy button and a CSV are the difference
 * between a page about templates and a page that hands you templates.
 *
 * Everything runs in the browser. No endpoint, no sign-in, nothing logged: the
 * file is assembled from data already in the bundle and handed to the browser
 * as a blob, so it also works on the prerendered HTML with JS as the only
 * requirement.
 */

/** The template as plain text, in the order Meta renders its components. */
export function templateToText(item: FestivalTemplateItem): string {
  const { row, stage, festival } = item;
  return [
    `${festival.name} — ${stage.label}`,
    `Template name: ${row.metaName}`,
    `Category: Marketing (${FESTIVAL_MARKETING_RATE} per delivered message, India)`,
    `Send: ${stage.timing} (${stageSendWindow(festival, stage)})`,
    '',
    row.body,
    '',
    `Footer: ${row.footer}`,
    `Button: ${row.buttonLabel}`,
  ].join('\n');
}

/** Just the message body, for the copy button inside a preview. */
export function templateBodyText(item: FestivalTemplateItem): string {
  return `${item.row.body}\n\n${item.row.footer}`;
}

/** RFC 4180: quote everything, double the inner quotes. */
function csvCell(value: string): string {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

export function templatesToCsv(items: FestivalTemplateItem[]): string {
  const header = [
    'festival',
    'festival_date',
    'campaign_stage',
    'send_window',
    'template_name',
    'display_name',
    'category',
    'language',
    'body',
    'footer',
    'button',
  ];
  const rows = items.map((item) =>
    [
      item.festival.name,
      item.row.festivalDate,
      item.stage.label,
      stageSendWindow(item.festival, item.stage),
      item.row.metaName,
      item.row.internalName,
      'MARKETING',
      item.row.language,
      item.row.body,
      item.row.footer,
      item.row.buttonLabel,
    ]
      .map(csvCell)
      .join(','),
  );
  // A BOM, so Excel opens the ₹ and the em dashes as UTF-8 instead of mojibake.
  return `\uFEFF${header.join(',')}\n${rows.join('\n')}\n`;
}

/** Hands the browser a file. Revokes the object URL so the blob can be freed. */
export function downloadFile(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Give the click a tick to start the download before the URL goes away.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadTemplatesCsv(items: FestivalTemplateItem[], filename: string): void {
  downloadFile(filename, templatesToCsv(items), 'text/csv');
}

/** Clipboard, with a guard: it throws in insecure contexts and older browsers. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
