'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import type { Product, Category } from '@/lib/types';

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
    badge_sq: product?.badge_sq ?? '',
    badge_en: product?.badge_en ?? '',
    in_stock: product?.in_stock ?? true,
    is_featured: product?.is_featured ?? false,
    is_new: product?.is_new ?? false,
    is_active: product?.is_active ?? true,
  });

  const handleNameChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      name_sq: val,
      // Auto-generate slug only if creating or slug is empty
      slug: mode === 'create' || !prev.slug ? generateSlug(val) : prev.slug,
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      // Validate
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
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveImage = async (url: string) => {
    if (!confirm('Fshi këtë foto?')) return;

    // Try to delete from storage too
    const match = url.match(/product-images\/(.+)$/);
    if (match) {
      await supabase.storage.from('product-images').remove([match[1]]);
    }

    setImages((prev) => prev.filter((u) => u !== url));
    toast.success('Foto u hoq');
  };

  const moveImage = (idx: number, direction: 'up' | 'down') => {
    const newImages = [...images];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newImages.length) return;
    [newImages[idx], newImages[targetIdx]] = [newImages[targetIdx], newImages[idx]];
    setImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (!form.name_sq || !form.name_en || !form.slug || !form.category_id) {
      toast.error('Plotëso të gjitha fushat e detyrueshme');
      setSaving(false);
      return;
    }

    const payload = {
      ...form,
      images,
      // Empty strings → null for optional fields
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
    } else {
      const { error } = await supabase.from('products').update(payload).eq('id', product!.id);
      if (error) {
        toast.error('Gabim: ' + error.message);
        setSaving(false);
        return;
      }
      toast.success('Produkti u përditësua');
      router.refresh();
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Main column */}
        <div className="space-y-6">
          {/* Basics */}
          <Card title="Të dhëna bazë">
            <Field label="Emri (Shqip) *">
              <input
                type="text"
                value={form.name_sq}
                onChange={(e) => handleNameChange(e.target.value)}
                required
                className="input"
                placeholder="P.sh. Solitaire Aurora"
              />
            </Field>
            <Field label="Emri (Anglisht) *">
              <input
                type="text"
                value={form.name_en}
                onChange={(e) => setForm({ ...form, name_en: e.target.value })}
                required
                className="input"
                placeholder="P.sh. Solitaire Aurora"
              />
            </Field>
            <Field label="URL Slug *">
              <input
                type="text"
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })
                }
                required
                className="input"
                placeholder="solitaire-aurora"
              />
              <p className="text-xs text-ink/50 mt-1 font-serif italic">
                Url-ja do të jetë: /produkt/{form.slug || '...'}
              </p>
            </Field>
          </Card>

          <Card title="Përshkrim">
            <Field label="Përshkrim (Shqip)">
              <textarea
                value={form.description_sq}
                onChange={(e) => setForm({ ...form, description_sq: e.target.value })}
                className="input min-h-[100px] resize-y"
                placeholder="Përshkrim i detajuar për klientët shqiptarë..."
              />
            </Field>
            <Field label="Përshkrim (Anglisht)">
              <textarea
                value={form.description_en}
                onChange={(e) => setForm({ ...form, description_en: e.target.value })}
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
                onChange={(e) => setForm({ ...form, material: e.target.value })}
                className="input"
                placeholder="Ari 18K · Diamant 0.5ct"
              />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Pesha">
                <input
                  type="text"
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
                  className="input"
                  placeholder="4.2g"
                />
              </Field>
              <Field label="Madhësia">
                <input
                  type="text"
                  value={form.size}
                  onChange={(e) => setForm({ ...form, size: e.target.value })}
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
                className={`block border-2 border-dashed border-line px-6 py-12 text-center cursor-pointer hover:border-gold hover:bg-pearl/40 transition-all ${
                  uploading ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <div className="font-display text-3xl text-gold-dark mb-2">+</div>
                <div className="font-serif text-base text-ink-black mb-1">
                  {uploading ? 'Duke ngarkuar...' : 'Kliko ose rrëshqit fotot këtu'}
                </div>
                <div className="text-[10px] tracking-widest uppercase text-gold-dark">
                  JPEG, PNG, WEBP · max 10MB
                </div>
              </label>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                  {images.map((url, i) => (
                    <div key={url} className="relative aspect-square border border-line bg-pearl">
                      <Image
                        src={url}
                        alt={`Foto ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                      {i === 0 && (
                        <span className="absolute top-2 left-2 bg-ink-black text-gold-light px-2 py-1 text-[9px] tracking-widest uppercase">
                          Kryesore
                        </span>
                      )}
                      <div className="absolute bottom-2 left-2 right-2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity bg-ink-black/80 backdrop-blur p-1">
                        <button
                          type="button"
                          onClick={() => moveImage(i, 'up')}
                          disabled={i === 0}
                          className="flex-1 text-pearl text-xs py-1 hover:text-gold-light disabled:opacity-30"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImage(i, 'down')}
                          disabled={i === images.length - 1}
                          className="flex-1 text-pearl text-xs py-1 hover:text-gold-light disabled:opacity-30"
                        >
                          →
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(url)}
                          className="flex-1 text-red-300 text-xs py-1 hover:text-red-200"
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

        {/* Sidebar column */}
        <div className="space-y-6">
          <Card title="Status">
            <Toggle
              label="Aktiv (i dukshëm)"
              checked={form.is_active}
              onChange={(v) => setForm({ ...form, is_active: v })}
            />
            <Toggle
              label="Në stok"
              checked={form.in_stock}
              onChange={(v) => setForm({ ...form, in_stock: v })}
            />
            <Toggle
              label="Featured"
              checked={form.is_featured}
              onChange={(v) => setForm({ ...form, is_featured: v })}
              hint="Shfaqet në homepage"
            />
            <Toggle
              label="Risi"
              checked={form.is_new}
              onChange={(v) => setForm({ ...form, is_new: v })}
            />
          </Card>

          <Card title="Kategoria *">
            <select
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              required
              className="input cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name_sq}
                </option>
              ))}
            </select>
          </Card>

          <Card title="Badge (opsionale)">
            <Field label="Badge (Shqip)">
              <input
                type="text"
                value={form.badge_sq}
                onChange={(e) => setForm({ ...form, badge_sq: e.target.value })}
                className="input"
                placeholder="Risi, Sezonal..."
              />
            </Field>
            <Field label="Badge (Anglisht)">
              <input
                type="text"
                value={form.badge_en}
                onChange={(e) => setForm({ ...form, badge_en: e.target.value })}
                className="input"
                placeholder="New, Seasonal..."
              />
            </Field>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="sticky bottom-0 mt-12 -mx-10 px-10 py-6 bg-white border-t border-line flex justify-between items-center">
        <Link
          href="/admin/produkte"
          className="text-[11px] tracking-widest uppercase text-ink-black hover:text-gold-dark transition-colors no-underline"
        >
          ← Anulo
        </Link>

        <button
          type="submit"
          disabled={saving || uploading}
          className="px-12 py-[18px] bg-ink-black text-pearl text-[11px] tracking-widest uppercase font-medium transition-colors hover:bg-gold-dark disabled:opacity-50 disabled:cursor-not-allowed"
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
    <div className="bg-white border border-line p-6">
      <h3 className="text-[10px] tracking-widest uppercase text-gold-dark mb-5 font-medium">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] tracking-widest uppercase text-ink/60 mb-2 font-medium">
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
  onChange: (v: boolean) => void;
  hint?: string;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer py-2 group">
      <div>
        <div className="font-serif text-base text-ink-black">{label}</div>
        {hint && <div className="text-xs text-ink/50 italic">{hint}</div>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 transition-colors ${
          checked ? 'bg-gold-dark' : 'bg-ink/20'
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </label>
  );
}
