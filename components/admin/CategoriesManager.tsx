'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import type { Category } from '@/lib/types';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function CategoriesManager({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const [edited, setEdited] = useState<Partial<Category>>({});
  const [newCategory, setNewCategory] = useState({
    name_sq: '',
    name_en: '',
    slug: '',
    description_sq: '',
    description_en: '',
    image: '',
  });

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEdited(cat);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEdited({});
  };

  const uploadImage = async (file: File, categoryId: string): Promise<string | null> => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error(`${file.name} është më e madhe se 10MB`);
      return null;
    }
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)) {
      toast.error('Format i pavlefshëm. Përdor JPEG, PNG, ose WEBP.');
      return null;
    }

    const ext = file.name.split('.').pop();
    const filename = `category-${categoryId}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from('product-images')
      .upload(filename, file, { upsert: false });

    if (error) {
      toast.error(`Gabim: ${error.message}`);
      return null;
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filename);
    return data.publicUrl;
  };

  const handleEditFileChange = async (e: React.ChangeEvent<HTMLInputElement>, catId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingId(catId);
    const url = await uploadImage(file, catId);
    setUploadingId(null);

    if (url) {
      setEdited((p) => ({ ...p, image: url }));
      toast.success('Foto u ngarkua');
    }
    e.target.value = '';
  };

  const handleNewFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingId('new');
    const url = await uploadImage(file, 'new');
    setUploadingId(null);

    if (url) {
      setNewCategory((p) => ({ ...p, image: url }));
      toast.success('Foto u ngarkua');
    }
    e.target.value = '';
  };

  const removeEditImage = async () => {
    const url = edited.image;
    if (!url) return;
    if (!confirm('Hiq foton e kategorisë?')) return;

    // Delete from storage
    const match = url.match(/product-images\/(.+)$/);
    if (match) {
      await supabase.storage.from('product-images').remove([match[1]]);
    }
    setEdited((p) => ({ ...p, image: null }));
  };

  const removeNewImage = async () => {
    const url = newCategory.image;
    if (!url) return;
    const match = url.match(/product-images\/(.+)$/);
    if (match) {
      await supabase.storage.from('product-images').remove([match[1]]);
    }
    setNewCategory((p) => ({ ...p, image: '' }));
  };

  const saveEdit = async () => {
    if (!editingId || !edited.name_sq || !edited.name_en || !edited.slug) {
      toast.error('Plotëso fushat e detyrueshme');
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from('categories')
      .update({
        name_sq: edited.name_sq,
        name_en: edited.name_en,
        slug: edited.slug,
        description_sq: edited.description_sq || null,
        description_en: edited.description_en || null,
        image: edited.image || null,
        is_active: edited.is_active ?? true,
        display_order: edited.display_order ?? 0,
      })
      .eq('id', editingId);

    setSaving(false);
    if (error) {
      toast.error('Gabim: ' + error.message);
      return;
    }
    toast.success('Kategoria u përditësua');
    setEditingId(null);
    setEdited({});
    router.refresh();
  };

  const handleNew = async () => {
    if (!newCategory.name_sq || !newCategory.name_en || !newCategory.slug) {
      toast.error('Plotëso fushat e detyrueshme');
      return;
    }
    setSaving(true);
    const { error } = await supabase.from('categories').insert({
      name_sq: newCategory.name_sq,
      name_en: newCategory.name_en,
      slug: newCategory.slug,
      description_sq: newCategory.description_sq || null,
      description_en: newCategory.description_en || null,
      image: newCategory.image || null,
      display_order: categories.length + 1,
    });
    setSaving(false);
    if (error) {
      toast.error('Gabim: ' + error.message);
      return;
    }
    toast.success('Kategoria u krijua');
    setShowNew(false);
    setNewCategory({ name_sq: '', name_en: '', slug: '', description_sq: '', description_en: '', image: '' });
    router.refresh();
  };

  const handleDelete = async (cat: Category) => {
    if (
      !confirm(
        `A je i sigurt që do të fshish "${cat.name_sq}"? Produkte në këtë kategori nuk mund të fshihen nëse ka produkte aktive.`
      )
    )
      return;

    setDeletingId(cat.id);

    // Try to delete category image from storage
    if (cat.image) {
      const match = cat.image.match(/product-images\/(.+)$/);
      if (match) await supabase.storage.from('product-images').remove([match[1]]);
    }

    const { error } = await supabase.from('categories').delete().eq('id', cat.id);
    setDeletingId(null);

    if (error) {
      toast.error(
        'Gabim: ' +
          (error.message.includes('foreign key')
            ? 'Kategoria ka produkte të lidhura. Fshi/zhvendos produktet së pari.'
            : error.message)
      );
      return;
    }
    toast.success('Kategoria u fshi');
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Add new */}
      {showNew ? (
        <div className="bg-white border-2 border-gold p-6">
          <h3 className="text-[10px] tracking-widest uppercase text-gold-dark mb-5 font-medium">
            Kategori e Re
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Emri (Shqip) *"
              value={newCategory.name_sq}
              onChange={(v) =>
                setNewCategory((p) => ({
                  ...p,
                  name_sq: v,
                  slug: !p.slug ? generateSlug(v) : p.slug,
                }))
              }
            />
            <Input
              label="Emri (Anglisht) *"
              value={newCategory.name_en}
              onChange={(v) => setNewCategory((p) => ({ ...p, name_en: v }))}
            />
          </div>
          <Input
            label="Slug *"
            value={newCategory.slug}
            onChange={(v) =>
              setNewCategory((p) => ({ ...p, slug: v.toLowerCase().replace(/[^a-z0-9-]/g, '-') }))
            }
            className="mb-4"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Textarea
              label="Përshkrim (Shqip)"
              value={newCategory.description_sq}
              onChange={(v) => setNewCategory((p) => ({ ...p, description_sq: v }))}
            />
            <Textarea
              label="Përshkrim (Anglisht)"
              value={newCategory.description_en}
              onChange={(v) => setNewCategory((p) => ({ ...p, description_en: v }))}
            />
          </div>

          {/* Image */}
          <div className="mb-6">
            <label className="block text-[10px] tracking-widest uppercase text-ink/60 mb-2 font-medium">
              Foto e Kategorisë
            </label>
            <p className="text-xs text-ink/50 italic mb-3 font-serif">
              Shfaqet në kartelën e kategorisë në homepage. Pa foto = SVG default.
            </p>
            {newCategory.image ? (
              <div className="relative inline-block">
                <Image
                  src={newCategory.image}
                  alt="Category preview"
                  width={200}
                  height={200}
                  className="object-cover border border-line"
                />
                <button
                  type="button"
                  onClick={removeNewImage}
                  className="absolute top-2 right-2 px-2 py-1 bg-ink-black text-pearl text-[9px] tracking-widest uppercase hover:bg-red-700"
                >
                  Hiq
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleNewFileChange}
                  className="hidden"
                  id="new-cat-image"
                  disabled={uploadingId === 'new'}
                />
                <label
                  htmlFor="new-cat-image"
                  className={`inline-block px-6 py-3 border-2 border-dashed border-line cursor-pointer hover:border-gold transition-colors text-[10px] tracking-widest uppercase text-gold-dark ${
                    uploadingId === 'new' ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  {uploadingId === 'new' ? 'Duke ngarkuar...' : '+ Ngarko Foto'}
                </label>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleNew}
              disabled={saving}
              className="px-6 py-3 bg-ink-black text-pearl text-[11px] tracking-widest uppercase hover:bg-gold-dark transition-colors disabled:opacity-50"
            >
              {saving ? 'Duke ruajtur...' : 'Krijo'}
            </button>
            <button
              onClick={() => {
                setShowNew(false);
                setNewCategory({ name_sq: '', name_en: '', slug: '', description_sq: '', description_en: '', image: '' });
              }}
              className="px-6 py-3 text-[11px] tracking-widest uppercase border border-line hover:border-gold text-ink-black transition-colors"
            >
              Anulo
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowNew(true)}
          className="w-full p-6 bg-white border-2 border-dashed border-line hover:border-gold transition-colors text-[11px] tracking-widest uppercase text-gold-dark hover:text-ink-black"
        >
          + Shto Kategori të Re
        </button>
      )}

      {/* Categories list */}
      <div className="bg-white border border-line">
        {categories.map((cat) => {
          const isEditing = editingId === cat.id;
          return (
            <div
              key={cat.id}
              className="p-6 border-b border-line/50 last:border-0"
            >
              {isEditing ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Emri (Shqip)"
                      value={edited.name_sq ?? ''}
                      onChange={(v) => setEdited((p) => ({ ...p, name_sq: v }))}
                    />
                    <Input
                      label="Emri (Anglisht)"
                      value={edited.name_en ?? ''}
                      onChange={(v) => setEdited((p) => ({ ...p, name_en: v }))}
                    />
                  </div>
                  <Input
                    label="Slug"
                    value={edited.slug ?? ''}
                    onChange={(v) =>
                      setEdited((p) => ({ ...p, slug: v.toLowerCase().replace(/[^a-z0-9-]/g, '-') }))
                    }
                    className="mb-4"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Textarea
                      label="Përshkrim (Shqip)"
                      value={edited.description_sq ?? ''}
                      onChange={(v) => setEdited((p) => ({ ...p, description_sq: v }))}
                    />
                    <Textarea
                      label="Përshkrim (Anglisht)"
                      value={edited.description_en ?? ''}
                      onChange={(v) => setEdited((p) => ({ ...p, description_en: v }))}
                    />
                  </div>

                  {/* Image */}
                  <div className="mb-4">
                    <label className="block text-[10px] tracking-widest uppercase text-ink/60 mb-2 font-medium">
                      Foto e Kategorisë
                    </label>
                    <p className="text-xs text-ink/50 italic mb-3 font-serif">
                      Shfaqet në kartelën e kategorisë në homepage. Pa foto = SVG default.
                    </p>
                    {edited.image ? (
                      <div className="relative inline-block">
                        <Image
                          src={edited.image}
                          alt="Category preview"
                          width={200}
                          height={200}
                          className="object-cover border border-line"
                        />
                        <button
                          type="button"
                          onClick={removeEditImage}
                          className="absolute top-2 right-2 px-2 py-1 bg-ink-black text-pearl text-[9px] tracking-widest uppercase hover:bg-red-700"
                        >
                          Hiq
                        </button>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/avif"
                          onChange={(e) => handleEditFileChange(e, cat.id)}
                          className="hidden"
                          id={`cat-image-${cat.id}`}
                          disabled={uploadingId === cat.id}
                        />
                        <label
                          htmlFor={`cat-image-${cat.id}`}
                          className={`inline-block px-6 py-3 border-2 border-dashed border-line cursor-pointer hover:border-gold transition-colors text-[10px] tracking-widest uppercase text-gold-dark ${
                            uploadingId === cat.id ? 'opacity-50 pointer-events-none' : ''
                          }`}
                        >
                          {uploadingId === cat.id ? 'Duke ngarkuar...' : '+ Ngarko Foto'}
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={saveEdit}
                      disabled={saving}
                      className="px-6 py-2 bg-ink-black text-pearl text-[10px] tracking-widest uppercase hover:bg-gold-dark transition-colors disabled:opacity-50"
                    >
                      {saving ? 'Duke ruajtur...' : 'Ruaj'}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-6 py-2 text-[10px] tracking-widest uppercase border border-line hover:border-gold text-ink-black transition-colors"
                    >
                      Anulo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 shrink-0 bg-pearl-warm border border-line overflow-hidden relative">
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name_sq}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-display text-2xl text-gold-dark">
                        ◇
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="font-display text-2xl text-ink-black">{cat.name_sq}</div>
                    <div className="text-[10px] tracking-widest uppercase text-gold-dark mt-1">
                      /{cat.slug} · {cat.name_en}
                    </div>
                    {cat.description_sq && (
                      <p className="font-serif italic text-base text-ink mt-3">
                        {cat.description_sq}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(cat)}
                      className="px-4 py-2 text-[10px] tracking-widest uppercase border border-line hover:border-gold text-ink-black transition-colors"
                    >
                      Edito
                    </button>
                    <button
                      onClick={() => handleDelete(cat)}
                      disabled={deletingId === cat.id}
                      className="px-4 py-2 text-[10px] tracking-widest uppercase text-red-700 border border-red-700/30 hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50"
                    >
                      {deletingId === cat.id ? '...' : 'Fshi'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[10px] tracking-widest uppercase text-ink/60 mb-2 font-medium">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 border-0 border-b border-line bg-transparent font-serif text-base text-ink-black outline-none focus:border-gold transition-colors"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-widest uppercase text-ink/60 mb-2 font-medium">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="w-full py-2 border-0 border-b border-line bg-transparent font-serif text-base text-ink-black outline-none focus:border-gold transition-colors resize-y"
      />
    </div>
  );
}
