'use client';

import { useState } from 'react';
import { site, buildWhatsAppGeneralUrl } from '@/lib/site';

export function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    occasion: '',
    people: '',
    date: '',
    area: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi Bytes & Tales — bulk/custom order enquiry:

Name: ${formData.name}
Phone: ${formData.phone}
Occasion: ${formData.occasion}
Approx. people: ${formData.people}
Preferred date: ${formData.date}
Delivery area: ${formData.area}

Notes: ${formData.notes}

Thank you!`;

    const url = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="enquire" className="py-32 bg-cream">
      <div className="wrap grid md:grid-cols-5 gap-12 md:gap-16">
        {/* Left: copy (2 cols) */}
        <div className="md:col-span-2">
          <div className="inline-flex items-center gap-3 mb-6 font-sans text-[11px] uppercase tracking-[0.32em] text-orange">
            <span className="w-12 h-px bg-orange" />
            <span>№ 06 · Place an Order</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-light leading-[1.05] mb-8">
            Tell us a little, &amp;<br />
            we'll <em className="italic text-wine">write back.</em>
          </h2>

          <p className="font-serif text-lg text-ink-soft leading-relaxed mb-8">
            For daily pastries, just message us on WhatsApp. For larger orders — celebrations, office mornings, custom boxes — fill the form and we'll reply within the hour.
          </p>

          <div className="space-y-3 pt-6 border-t border-ink/15 font-sans text-sm">
            <ContactRow label="WhatsApp">
              <a href={buildWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-wine transition-colors">
                {site.whatsappDisplay}
              </a>
            </ContactRow>
            <ContactRow label="Email">
              <a href={`mailto:${site.email}`} className="hover:text-wine transition-colors">
                {site.email}
              </a>
            </ContactRow>
            <ContactRow label="Hours">{site.hours}</ContactRow>
            <ContactRow label="Delivery">{site.deliveryArea}</ContactRow>
          </div>
        </div>

        {/* Right: actual form (3 cols) — clearly bordered card */}
        <div className="md:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="bg-cream-warm/50 border border-ink/15 rounded-sm p-8 md:p-10 shadow-sm"
          >
            <div className="font-sans text-[10px] uppercase tracking-[0.32em] text-orange mb-2">
              Bulk &amp; custom order form
            </div>
            <p className="font-serif italic text-ink-mute text-sm mb-8">
              Required fields marked with *
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="Your name *"
                required
                value={formData.name}
                onChange={(v) => setFormData({ ...formData, name: v })}
                placeholder="Adaeze Okafor"
              />
              <FormField
                label="WhatsApp / phone *"
                required
                type="tel"
                value={formData.phone}
                onChange={(v) => setFormData({ ...formData, phone: v })}
                placeholder="+44 7..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <FormField
                label="Occasion"
                type="select"
                value={formData.occasion}
                onChange={(v) => setFormData({ ...formData, occasion: v })}
                options={['', 'Birthday', 'Wedding', 'Office / corporate', 'Celebration', 'Just because', 'Other']}
              />
              <FormField
                label="Approx. people"
                type="select"
                value={formData.people}
                onChange={(v) => setFormData({ ...formData, people: v })}
                options={['', '1–5', '6–12', '13–25', '26–50', '50+']}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <FormField
                label="Preferred date"
                type="date"
                value={formData.date}
                onChange={(v) => setFormData({ ...formData, date: v })}
              />
              <FormField
                label="Delivery area *"
                required
                value={formData.area}
                onChange={(v) => setFormData({ ...formData, area: v })}
                placeholder="e.g. Didsbury, M20"
              />
            </div>

            <div className="mt-5">
              <FormField
                label="Tell us more"
                type="textarea"
                value={formData.notes}
                onChange={(v) => setFormData({ ...formData, notes: v })}
                placeholder="Pastry mix, dietary notes, theme, anything else we should know…"
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full bg-wine text-cream py-4 px-6 font-sans text-[13px] uppercase tracking-[0.18em] hover:bg-wine-deep transition-colors flex items-center justify-center gap-3"
            >
              Send via WhatsApp <span aria-hidden>→</span>
            </button>

            <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.18em] text-ink-mute text-center">
              Submitting opens WhatsApp with your details pre-filled.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="font-medium uppercase tracking-[0.18em] text-[11px] text-ink-mute w-24 shrink-0">
        {label}
      </span>
      <span className="text-ink-soft">{children}</span>
    </div>
  );
}

function FormField({
  label,
  required,
  type = 'text',
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string;
  required?: boolean;
  type?: 'text' | 'tel' | 'date' | 'select' | 'textarea';
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  options?: string[];
}) {
  // Common box styles for all inputs — clear bordered boxes, on cream
  const boxStyle =
    'w-full bg-cream border border-ink/20 rounded-sm px-4 py-3 font-serif text-base text-ink placeholder:text-ink-mute/60 focus:outline-none focus:border-wine focus:ring-1 focus:ring-wine/30 transition-all';

  return (
    <label className="block">
      <span className="block font-sans text-[11px] uppercase tracking-[0.18em] text-ink-soft mb-2">
        {label}
      </span>

      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={`${boxStyle} resize-none`}
        />
      ) : type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`${boxStyle} appearance-none bg-cream cursor-pointer`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%237A6B60' viewBox='0 0 12 12'%3E%3Cpath d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            paddingRight: '2.5rem',
          }}
        >
          <option value="" disabled>
            Select an option…
          </option>
          {options?.filter(Boolean).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={boxStyle}
        />
      )}
    </label>
  );
}
