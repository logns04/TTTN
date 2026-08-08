import { CornerDownRight, Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SwitchField } from '@/components/admin/SwitchField';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { ImageUploader } from '@/components/common/ImageUploader';
import { SafeImage } from '@/components/common/SafeImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { EmptyState, LoadingBlock, Spinner } from '@/components/ui/feedback';
import { Input, Label, Select, Textarea } from '@/components/ui/input';
import { Table, TableWrapper, Tbody, Td, Th, Thead, Tr } from '@/components/ui/table';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { getErrorMessage } from '@/services/axios';
import { categoryApi } from '@/services/catalog.api';
import type { Category } from '@/types';

interface FormState {
  name: string;
  parentId: string;
  description: string;
  image: string[];
  status: boolean;
  sortOrder: string;
}

const EMPTY_FORM: FormState = {
  name: '',
  parentId: '',
  description: '',
  image: [],
  status: true,
  sortOrder: '0',
};

export const AdminCategoriesPage = () => {
  useDocumentTitle('Quản lý danh mục');

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<Category | null>(null);
  const [removing, setRemoving] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    categoryApi
      .list()
      .then((items) => {
        if (!cancelled) setCategories(items);
      })
      .catch((error) => {
        if (!cancelled) toast.error(getErrorMessage(error, 'Không tải được danh mục'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const parents = categories.filter((item) => item.parentId === null);
  const ordered = parents.flatMap((parent) => [
    parent,
    ...categories.filter((item) => item.parentId === parent.id),
  ]);

  const openCreate = (parentId?: number) => {
    setEditing(null);
    setForm({ ...EMPTY_FORM, parentId: parentId ? String(parentId) : '' });
    setDialogOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditing(category);
    setForm({
      name: category.name,
      parentId: category.parentId ? String(category.parentId) : '',
      description: category.description ?? '',
      image: category.image ? [category.image] : [],
      status: category.status,
      sortOrder: String(category.sortOrder),
    });
    setDialogOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const body = {
        name: form.name,
        parentId: form.parentId ? Number(form.parentId) : null,
        description: form.description || undefined,
        image: form.image[0] ?? undefined,
        status: form.status,
        sortOrder: Number(form.sortOrder) || 0,
      };

      if (editing) await categoryApi.update(editing.id, body);
      else await categoryApi.create(body);

      toast.success(editing ? 'Đã cập nhật danh mục' : 'Đã tạo danh mục');
      setDialogOpen(false);
      setReloadKey((key) => key + 1);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Lưu danh mục thất bại'));
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!deleting) return;
    setRemoving(true);
    try {
      await categoryApi.remove(deleting.id);
      toast.success(`Đã xoá "${deleting.name}"`);
      setDeleting(null);
      setReloadKey((key) => key + 1);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Xoá thất bại'));
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Quản lý danh mục"
        description={
          loading
            ? 'Đang tải...'
            : `${parents.length} danh mục cha, ${categories.length - parents.length} danh mục con`
        }
        action={
          <Button onClick={() => openCreate()}>
            <Plus />
            Thêm danh mục
          </Button>
        }
      />

      {loading ? (
        <LoadingBlock />
      ) : categories.length === 0 ? (
        <EmptyState title="Chưa có danh mục nào" />
      ) : (
        <TableWrapper>
          <Table>
            <Thead>
              <tr>
                <Th className="w-16">Ảnh</Th>
                <Th>Tên danh mục</Th>
                <Th>Mô tả</Th>
                <Th className="text-right">Sản phẩm</Th>
                <Th className="text-center">Thứ tự</Th>
                <Th>Trạng thái</Th>
                <Th className="w-28 text-right">Thao tác</Th>
              </tr>
            </Thead>
            <Tbody>
              {ordered.map((category) => {
                const isChild = category.parentId !== null;
                return (
                  <Tr key={category.id}>
                    <Td>
                      <div className="size-10 overflow-hidden rounded bg-muted">
                        <SafeImage
                          src={category.image ?? ''}
                          alt={category.name}
                          className="size-full object-cover"
                        />
                      </div>
                    </Td>
                    <Td>
                      <span
                        className={
                          isChild ? 'flex items-center gap-1.5 pl-4 text-muted-foreground' : 'font-semibold'
                        }
                      >
                        {isChild ? <CornerDownRight className="size-3.5" /> : null}
                        {category.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        /{category.slug}
                      </span>
                    </Td>
                    <Td className="max-w-64">
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {category.description ?? '—'}
                      </p>
                    </Td>
                    <Td className="text-right">{category._count?.products ?? 0}</Td>
                    <Td className="text-center text-muted-foreground">{category.sortOrder}</Td>
                    <Td>
                      {category.status ? (
                        <Badge variant="success">Đang bật</Badge>
                      ) : (
                        <Badge variant="muted">Đang tắt</Badge>
                      )}
                    </Td>
                    <Td>
                      <div className="flex justify-end gap-1">
                        {!isChild ? (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openCreate(category.id)}
                            title="Thêm danh mục con"
                            aria-label="Thêm danh mục con"
                          >
                            <Plus />
                          </Button>
                        ) : null}
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => openEdit(category)}
                          aria-label="Sửa"
                        >
                          <Pencil />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive"
                          onClick={() => setDeleting(category)}
                          aria-label="Xoá"
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableWrapper>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent title={editing ? 'Sửa danh mục' : 'Thêm danh mục'}>
          <div className="space-y-4 p-4">
            <div>
              <Label htmlFor="name">Tên danh mục *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Phòng khách"
              />
            </div>

            <div>
              <Label htmlFor="parentId">Danh mục cha</Label>
              <Select
                id="parentId"
                value={form.parentId}
                onChange={(event) => setForm({ ...form, parentId: event.target.value })}
              >
                <option value="">— Là danh mục gốc —</option>
                {parents
                  .filter((parent) => parent.id !== editing?.id)
                  .map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  ))}
              </Select>
              <p className="mt-1 text-xs text-muted-foreground">
                Chỉ hỗ trợ 2 cấp. Sản phẩm nên gán vào danh mục con.
              </p>
            </div>

            <div>
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                rows={2}
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
              />
            </div>

            <div>
              <Label>Ảnh danh mục</Label>
              <ImageUploader
                single
                value={form.image}
                onChange={(image) => setForm({ ...form, image })}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="sortOrder">Thứ tự hiển thị</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  min={0}
                  value={form.sortOrder}
                  onChange={(event) => setForm({ ...form, sortOrder: event.target.value })}
                />
              </div>
              <div className="flex items-end">
                <div className="w-full">
                  <SwitchField
                    label="Hiển thị"
                    checked={form.status}
                    onChange={(status) => setForm({ ...form, status })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-border p-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
              Huỷ
            </Button>
            <Button onClick={() => void save()} disabled={saving}>
              {saving ? <Spinner /> : null}
              {editing ? 'Lưu thay đổi' : 'Tạo danh mục'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Xoá danh mục?"
        description={
          <>
            Danh mục <strong>{deleting?.name}</strong> sẽ bị xoá. Không xoá được nếu còn danh mục con
            hoặc còn sản phẩm.
          </>
        }
        loading={removing}
        onConfirm={() => void remove()}
      />
    </div>
  );
};
