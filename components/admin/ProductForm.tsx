'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import type { Category, Product } from '@/lib/types';

interface ProductFormProps {
  product?: Product | null;
  categories: Category[];
  mode: 'create' | 'edit';
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function parseOptionalPrice(value: string) {
  const normalized = value.trim().replace(',', '.');

  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : Number.NaN;
}

export function ProductForm({ product, categories, mode }: ProductFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(product?.images ?? []);

  const [form, setForm] = useState({
    name_sq: product?.name_sq ?? '',
    name_en: product?.name_en ?? '',
    slug: product?.slug ?? '',
    description_sq: product?.description_sq ?? '',
    description_en: product?.description_en ?? '',
    category_id: product?.category_id ?? categories[0]?.id ?? '',
    material: product?.material ?? '',
    weight: product?.weight ?? '',
    size: product?.size ?? '',
    price_eur: product?.price_eur?.toString() ?? '',
    price_lek: product?.price_lek?.toString() ?? '',
    show_price: product?.show_price ?? false,
    badge_sq: product?.badge_sq ?? '',
    badge_en: product?.badge_en ?? '',
    in_stock: product?.in_stock ?? true,
    is_featured: product?.is_featured ?? false,
    is_new: product?.is_new ?? false,
    is_active: product?.is_active ?? true,
  });

  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name_sq: value,
      slug: mode === 'create' || !prev.slug ? generateSlug(value) : prev.slug,
    }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} është më e madhe se 10MB`);
        continue;
      }

      if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)) {
        toast.error(`${file.name} nuk është format i lejuar`);
        continue;
      }

      const ext = file.name.split('.').pop();
      const filename = `${form.slug || 'product'}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filename, file, { upsert: false });

      if (uploadError) {
        toast.error(`Gabim: ${uploadError.message}`);
        continue;
      }

      const { data } = supabase.storage.from('product-images').getPublicUrl(filename);
      newUrls.push(data.publicUrl);
    }

    if (newUrls.length > 0) {
      setImages((prev) => [...prev, ...newUrls]);
      toast.success(`${newUrls.length} foto u ngarkuan`);
    }

    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = async (url: string) => {
    if (!confirm('Fshi këtë foto?')) return;

    const match = url.match(/product-images\/(.+)$/);
    if (match) {
      await supabase.storage.from('product-images').remove([match[1]]);
    }

    setImages((prev) => prev.filter((entry) => entry !== url));
    toast.success('Foto u hoq');
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const nextImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= nextImages.length) return;

    [nextImages[index], nextImages[targetIndex]] = [nextImages[targetIndex], nextImages[index]];
    setImages(nextImages);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);

    if (!form.name_sq || !form.name_en || !form.slug || !form.category_id) {
      toast.error('Plotëso të gjitha fushat e detyrueshme');
      setSaving(false);
      return;
    }

    const priceEur = parseOptionalPrice(form.price_eur);
    const priceLek = parseOptionalPrice(form.price_lek);

    if (Number.isNaN(priceEur) || Number.isNaN(priceLek)) {
      toast.error('Çmimi duhet të jetë numër i vlefshëm');
      setSaving(false);
      return;
    }

    if (form.show_price && priceEur === null && priceLek === null) {
      toast.error('Vendos të paktën një çmim ose çaktivizo shfaqjen e çmimit');
      setSaving(false);
      return;
    }

    const payload = {
      ...form,
      images,
      price_eur: priceEur,
      price_lek: priceLek,
      description_sq: form.description_sq || null,
      description_en: form.description_en || null,
      material: form.material || null,
      weight: form.weight || null,
      size: form.size || null,
      badge_sq: form.badge_sq || null,
      badge_en: form.badge_en || null,
    };

    if (mode === 'create') {
      const { error } = await supabase.from('products').insert(payload);

      if (error) {
        toast.error('Gabim: ' + error.message);
        setSaving(false);
        return;
      }

      toast.success('Produkti u krijua');
      router.push('/admin/produkte');
      router.refresh();
      return;
    }

    const { error } = await supabase.from('products').update(payload).eq('id', product!.id);

    if (error) {
      toast.error('Gabim: ' + error.message);
      setSaving(false);
      return;
    }

    toast.success('Produkti u përditësua');
    router.refresh();
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card title="Të dhëna bazë">
            <Field label="Emri (Shqip) *">
              <input
                type="text"
                value={form.name_sq}
                onChange={(event) => handleNameChange(event.target.value)}
                required
                className="input"
                placeholder="P.sh. Solitaire Aurora"
              />
            </Field>
            <Field label="Emri (Anglisht) *">
              <input
                type="text"
                value={form.name_en}
                onChange={(event) => setForm({ ...form, name_en: event.target.value })}
                required
                className="input"
                placeholder="P.sh. Solitaire Aurora"
              />
            </Field>
            <Field label="URL Slug *">
              <input
                type="text"
                value={form.slug}
                onChange={(event) =>
                  setForm({
                    ...form,
                    slug: event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                  })
                }
                required
                className="input"
                placeholder="solitaire-aurora"
              />
              <p className="mt-1 text-xs italic text-ink/50 font-serif">
                Url-ja do të jetë: /produkt/{form.slug || '...'}
              </p>
            </Field>
          </Card>

          <Card title="Përshkrim">
            <Field label="Përshkrim (Shqip)">
              <textarea
                value={form.description_sq}
                onChange={(event) => setForm({ ...form, description_sq: event.target.value })}
                className="input min-h-[100px] resize-y"
                placeholder="Përshkrim i detajuar për klientët shqiptarë..."
              />
            </Field>
            <Field label="Përshkrim (Anglisht)">
              <textarea
                value={form.description_en}
                onChange={(event) => setForm({ ...form, description_en: event.target.value })}
                className="input min-h-[100px] resize-y"
                placeholder="Detailed description for English-speaking clients..."
              />
            </Field>
          </Card>

          <Card title="Specifikime">
            <Field label="Material">
              <input
                type="text"
                value={form.material}
                onChange={(event) => setForm({ ...form, material: event.target.value })}
                className="input"
                placeholder="Ari 18K · Diamant 0.5ct"
              />
            </Field>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Pesha">
                <input
                  type="text"
                  value={form.weight}
                  onChange={(event) => setForm({ ...form, weight: event.target.value })}
                  className="input"
                  placeholder="4.2g"
                />
              </Field>
              <Field label="Madhësia">
                <input
                  type="text"
                  value={form.size}
                  onChange={(event) => setForm({ ...form, size: event.target.value })}
                  className="input"
                  placeholder="52 ose 18cm"
                />
              </Field>
            </div>
          </Card>

          <Card title="Foto">
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/webp,image/avif"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className={`block cursor-pointer border-2 border-dashed border-line px-6 py-12 text-center transition-all hover:border-gold hover:bg-pearl/40 ${
                  uploading ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                <div className="mb-2 font-display text-3xl text-gold-dark">+</div>
                <div className="mb-1 font-serif text-base text-ink-black">
                  {uploading ? 'Duke ngarkuar...' : 'Kliko ose rrëshqit fotot këtu'}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-gold-dark">
                  JPEG, PNG, WEBP · max 10MB
                </div>
              </label>

              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {images.map((url, index) => (
                    <div key={url} className="relative aspect-square border border-line bg-pearl">
                      <Image
                        src={url}
                        alt={`Foto ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                      {index === 0 && (
                        <span className="absolute left-2 top-2 bg-ink-black px-2 py-1 text-[9px] uppercase tracking-widest text-gold-light">
                          Kryesore
                        </span>
                      )}
                      <div className="absolute bottom-2 left-2 right-2 flex gap-1 bg-ink-black/80 p-1 opacity-0 backdrop-blur transition-opacity hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => moveImage(index, 'up')}
                          disabled={index === 0}
                          className="flex-1 py-1 text-xs text-pearl hover:text-gold-light disabled:opacity-30"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImage(index, 'down')}
                          disabled={index === images.length - 1}
                          className="flex-1 py-1 text-xs text-pearl hover:text-gold-light disabled:opacity-30"
                        >
                          →
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(url)}
                          className="flex-1 py-1 text-xs text-red-300 hover:text-red-200"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Status">
            <Toggle
              label="Aktiv (i dukshëm)"
              checked={form.is_active}
              onChange={(value) => setForm({ ...form, is_active: value })}
            />
            <Toggle
              label="Në stok"
              checked={form.in_stock}
              onChange={(value) => setForm({ ...form, in_stock: value })}
            />
            <Toggle
              label="Featured"
              checked={form.is_featured}
              onChange={(value) => setForm({ ...form, is_featured: value })}
              hint="Shfaqet në homepage"
            />
            <Toggle
              label="Risi"
              checked={form.is_new}
              onChange={(value) => setForm({ ...form, is_new: value })}
            />
          </Card>

          <Card title="Kategoria *">
            <select
              value={form.category_id}
              onChange={(event) => setForm({ ...form, category_id: event.target.value })}
              required
              className="input cursor-pointer"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name_sq}
                </option>
              ))}
            </select>
          </Card>

          <Card title="Çmimi">
            <Toggle
              label="Shfaq çmimin në website"
              checked={form.show_price}
              onChange={(value) => setForm({ ...form, show_price: value })}
              hint='Kur është çaktivizuar, faqja shfaq "Sipas kërkesës".'
            />

            <div className="grid grid-cols-1 gap-4 pt-2">
              <Field label="Çmimi në Euro">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={form.price_eur}
                  onChange={(event) => setForm({ ...form, price_eur: event.target.value })}
                  className="input"
                  placeholder="P.sh. 850"
                />
              </Field>
              <Field label="Çmimi në Lek">
                <input
                  type="number"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  value={form.price_lek}
                  onChange={(event) => setForm({ ...form, price_lek: event.target.value })}
                  className="input"
                  placeholder="P.sh. 85000"
                />
              </Field>
            </div>
          </Card>

          <Card title="Badge (opsionale)">
            <Field label="Badge (Shqip)">
              <input
                type="text"
                value={form.badge_sq}
                onChange={(event) => setForm({ ...form, badge_sq: event.target.value })}
                className="input"
                placeholder="Risi, Sezonal..."
              />
            </Field>
            <Field label="Badge (Anglisht)">
              <input
                type="text"
                value={form.badge_en}
                onChange={(event) => setForm({ ...form, badge_en: event.target.value })}
                className="input"
                placeholder="New, Seasonal..."
              />
            </Field>
          </Card>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-10 mt-12 flex items-center justify-between border-t border-line bg-white px-10 py-6">
        <Link
          href="/admin/produkte"
          className="text-[11px] uppercase tracking-widest text-ink-black no-underline transition-colors hover:text-gold-dark"
        >
          ← Anulo
        </Link>

        <button
          type="submit"
          disabled={saving || uploading}
          className="px-12 py-[18px] text-[11px] uppercase tracking-widest text-pearl bg-ink-black font-medium transition-colors hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? 'Duke ruajtur...' : mode === 'create' ? 'Krijo Produktin' : 'Ruaj Ndryshimet'}
        </button>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          padding: 14px 0;
          border: 0;
          border-bottom: 1px solid rgba(201, 169, 97, 0.18);
          background: transparent;
          font-family: var(--font-cormorant), serif;
          font-size: 17px;
          color: #0a0a0a;
          outline: none;
          transition: border-color 0.3s;
        }

        :global(.input:focus) {
          border-bottom-color: #c9a961;
        }
      `}</style>
    </form>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-line bg-white p-6">
      <h3 className="mb-5 text-[10px] uppercase tracking-widest text-gold-dark font-medium">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-widest text-ink/60 font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  hint?: string;
}) {
  return (
    <label className="group flex cursor-pointer items-center justify-between py-2">
      <div>
        <div className="font-serif text-base text-ink-black">{label}</div>
        {hint && <div className="text-xs italic text-ink/50">{hint}</div>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 transition-colors ${checked ? 'bg-gold-dark' : 'bg-ink/20'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </label>
  );
}
