import { useId, useState, type FormEvent } from 'react';
import { PARTNER_EMAIL } from '../../data/partners';

const ROLES = ['Agency', 'Freelancer', 'Creator', 'Consultant', 'Other'] as const;

/**
 * "Run an agency or community and want to talk first?"
 *
 * The site has no form endpoint: /contact has no form and sends people to
 * WhatsApp and Instagram. So Send opens the visitor's email app with the
 * message addressed to partners@topedgeai.com and tagged `topic: partners`,
 * and the address is shown as plain text for anyone without a mail app.
 */
export default function PartnerContactForm() {
  const id = useId();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) || '').trim().slice(0, 2000);
    const name = get('name');
    const subject = `Partner program: ${name || 'enquiry'}`;
    const body = [
      'topic: partners',
      `Name: ${name}`,
      `Email: ${get('email')}`,
      `I am a: ${get('role')}`,
      `Website or main channel: ${get('website') || '-'}`,
      '',
      get('message'),
    ].join('\n');
    window.location.href = `mailto:${PARTNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="mkt-pform" onSubmit={onSubmit} aria-labelledby={`${id}-h`}>
      <h3 className="mkt-pform__title" id={`${id}-h`}>
        Run an agency or community and want to talk first?
      </h3>
      <div className="mkt-pform__grid">
        <label className="mkt-pform__field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={120} />
        </label>
        <label className="mkt-pform__field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
        <label className="mkt-pform__field">
          <span>I am a</span>
          <select name="role" defaultValue="Agency">
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <label className="mkt-pform__field">
          <span>
            Website or main channel <em>(optional)</em>
          </span>
          <input name="website" type="text" autoComplete="url" maxLength={200} />
        </label>
        <label className="mkt-pform__field mkt-pform__field--wide">
          <span>Message</span>
          <textarea name="message" rows={4} required maxLength={2000} />
        </label>
      </div>
      <div className="mkt-pform__foot">
        <button type="submit" className="mkt-btn-primary">
          Send
        </button>
        <p className="mkt-pform__note" aria-live="polite">
          {sent
            ? `Your email app should now be open with the message filled in. If it did not open, write to ${PARTNER_EMAIL}.`
            : 'Send opens your email app with the message filled in.'}{' '}
          {sent ? null : (
            <>
              Or write to <a href={`mailto:${PARTNER_EMAIL}`}>{PARTNER_EMAIL}</a>.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
