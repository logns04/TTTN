import { Pencil, Plus, Trash2 } from 'lucide-react';
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
import { Input, Label } from '@/components/ui/input';
import { Table, TableWrapper, Tbody, Td, Th, Thead, Tr } from '@/components/ui/table';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { getErrorMessage } from '@/services/axios';
import { bannerApi } from '@/services/catalog.api';
import { useAppSelector } from '@/store';
import type { Banner } from '@/types';

interface FormState {
  title: string;
  image: string[];
  link: string;
  status: boolean;
  sortOrder: string;
}

const EMPTY_FORM: FormState = { title: '', image: [], link: '', status: true, sortOrder: '0' };

export const AdminBannersPage = () => {
  useDocumentTitle('Quản lý banner');

  const role = useAppSelector((state) => state.auth.user?.role);
  const canDelete = role === 'SUPERADMIN' || role === 'ADMIN';

  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<Banner | null>(null);
  const [removing, setRemoving] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    bannerApi
      .list(true)
      .then((items) => {
        if (!cancelled) setBanners(items);
      })
      .catch((error) => {
        if (!cancelled) toast.error(getErrorMessage(error, 'Không tải được banner'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM, sortOrder: String(banners.length + 1) });
    setDialogOpen(true);
  };

  const openEdit = (banner: Banner) => {
    setEditing(banner);
    setForm({
      title: banner.title,
      image: [banner.image],
      link: banner.link ?? '',
      status: banner.status,
      sortOrder: String(banner.sortOrder),
    });
    setDialogOpen(true);
  };

  const save = async () => {
    if (form.image.length === 0) {
      toast.error('Cần tải lên ảnh banner');
      return;
    }

    setSaving(true);
    try {
      const body = {
        title: form.title,
        image: form.image[0],
        link: form.link || undefined,
        status: form.status,
        sortOrder: Number(form.sortOrder) || 0,
      };

      if (editing) await bannerApi.update(editing.id, body);
      else await bannerApi.create(body);

      toast.success(editing ? 'Đã cập nhật banner' : 'Đã tạo banner');
      setDialogOpen(false);
      setReloadKey((key) => key + 1);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Lưu banner thất bại'));
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!deleting) return;
    setRemoving(true);
    try {
      await bannerApi.remove(deleting.id);
      toast.success('Đã xoá banner');
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
        title="Quản lý banner"
        description={loading ? 'Đang tải...' : `${banners.length} banner`}
        action={
          <Button onClick={openCreate}>
            <Plus />
            Thêm banner
          </Button>
        }
      />

      {loading ? (
        <LoadingBlock />
      ) : banners.length === 0 ? (
        <EmptyState title="Chưa có banner nào" description="Banner hiện ở đầu trang chủ." />
      ) : (
        <TableWrapper>
          <Table>
            <Thead>
              <tr>
                <Th className="w-40">Ảnh</Th>
                <Th>Tiêu đề</Th>
                <Th>Liên kết</Th>
                <Th className="text-center">Thứ tự</Th>
                <Th>Trạng thái</Th>
                <Th className="w-24 text-right">Thao tác</Th>
              </tr>
            </Thead>
            <Tbody>
              {banners.map((banner) => (
                <Tr key={banner.id}>
                  <Td>
                    <div className="h-14 w-36 overflow-hidden rounded bg-muted">
                      <SafeImage
                        src={banner.image}
                        alt={banner.title}
                        className="size-full object-cover"
                      />
                    </div>
                  </Td>
                  <Td className="font-medium">{banner.title}</Td>
                  <Td>
                    <code className="text-xs text-muted-foreground">{banner.link ?? '—'}</code>
                  </Td>
                  <Td className="text-center text-muted-foreground">{banner.sortOrder}</Td>
                  <Td>
                    {banner.status ? (
                      <Badge variant="success">Đang bật</Badge>
                    ) : (
                      <Badge variant="muted">Đang tắt</Badge>
                    )}
                  </Td>
                  <Td>
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => openEdit(banner)}
                        aria-label="Sửa"
                      >
                        <Pencil />
                      </Button>
                      {canDelete ? (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive"
                          onClick={() => setDeleting(banner)}
                          aria-label="Xoá"
                        >
                          <Trash2 />
                        </Button>
                      ) : null}
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableWrapper>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent title={editing ? 'Sửa banner' : 'Thêm banner'}>
          <div className="space-y-4 p-4">
            <div>
              <Label htmlFor="title">Tiêu đề *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                placeholder="Bộ sưu tập phòng khách 2026"
              />
            </div>

            <div>
              <Label>Ảnh banner *</Label>
              <ImageUploader
                single
                value={form.image}
                onChange={(image) => setForm({ ...form, image })}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Nên dùng ảnh ngang, tỷ lệ khoảng 8:3 để không bị cắt nhiều.
              </p>
            </div>

            <div>
              <Label htmlFor="link">Liên kết khi bấm vào</Label>
              <Input
                id="link"
                value={form.link}
                onChange={(event) => setForm({ ...form, link: event.target.value })}
                placeholder="/products?category=phong-khach"
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
              {editing ? 'Lưu thay đổi' : 'Tạo banner'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Xoá banner?"
        description={
          <>
            Banner <strong>{deleting?.title}</strong> sẽ bị xoá khỏi trang chủ.
          </>
        }
        loading={removing}
        onConfirm={() => void remove()}
      />
    </div>
  );
};
