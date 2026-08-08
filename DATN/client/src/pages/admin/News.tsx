import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SwitchField } from '@/components/admin/SwitchField';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { ImageUploader } from '@/components/common/ImageUploader';
import { Pagination } from '@/components/common/Pagination';
import { RichTextEditor } from '@/components/common/RichTextEditor';
import { SafeImage } from '@/components/common/SafeImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { EmptyState, LoadingBlock, Spinner } from '@/components/ui/feedback';
import { Input, Label, Textarea } from '@/components/ui/input';
import { Table, TableWrapper, Tbody, Td, Th, Thead, Tr } from '@/components/ui/table';
import { useDebounce } from '@/hooks/useDebounce';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { formatDate } from '@/lib/format';
import { getErrorMessage } from '@/services/axios';
import { newsApi } from '@/services/shop.api';
import { useAppSelector } from '@/store';
import type { NewsItem, PageMeta } from '@/types';

interface FormState {
  title: string;
  image: string[];
  summary: string;
  content: string;
  publishedAt: string;
  status: boolean;
}

/** input[type=date] cần định dạng yyyy-MM-dd. */
const toDateInput = (value: string | Date) => new Date(value).toISOString().slice(0, 10);

const EMPTY_FORM: FormState = {
  title: '',
  image: [],
  summary: '',
  content: '',
  publishedAt: toDateInput(new Date()),
  status: true,
};

const DEFAULT_META: PageMeta = { page: 1, limit: 10, total: 0, totalPages: 1 };

export const AdminNewsPage = () => {
  useDocumentTitle('Quản lý tin tức');

  const role = useAppSelector((state) => state.auth.user?.role);
  const canDelete = role === 'SUPERADMIN' || role === 'ADMIN';

  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [meta, setMeta] = useState<PageMeta>(DEFAULT_META);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<NewsItem | null>(null);
  const [removing, setRemoving] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => setPage(1), [debouncedSearch]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    newsApi
      .list({ page, limit: 10, search: debouncedSearch || undefined, all: true })
      .then((result) => {
        if (cancelled) return;
        setArticles(result.items);
        setMeta(result.meta);
      })
      .catch((error) => {
        if (!cancelled) toast.error(getErrorMessage(error, 'Không tải được tin tức'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, debouncedSearch, reloadKey]);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEdit = async (article: NewsItem) => {
    try {
      const detail = await newsApi.adminDetail(article.id);
      setEditingId(detail.id);
      setForm({
        title: detail.title,
        image: detail.image ? [detail.image] : [],
        summary: detail.summary ?? '',
        content: detail.content,
        publishedAt: toDateInput(detail.publishedAt),
        status: detail.status,
      });
      setDialogOpen(true);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Không tải được bài viết'));
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      const body = {
        title: form.title,
        image: form.image[0] ?? undefined,
        summary: form.summary || undefined,
        content: form.content,
        publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : undefined,
        status: form.status,
      };

      if (editingId) await newsApi.update(editingId, body);
      else await newsApi.create(body);

      toast.success(editingId ? 'Đã cập nhật bài viết' : 'Đã tạo bài viết');
      setDialogOpen(false);
      setReloadKey((key) => key + 1);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Lưu bài viết thất bại'));
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!deleting) return;
    setRemoving(true);
    try {
      await newsApi.remove(deleting.id);
      toast.success('Đã xoá bài viết');
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
        title="Quản lý tin tức"
        description={loading ? 'Đang tải...' : `${meta.total} bài viết`}
        action={
          <Button onClick={openCreate}>
            <Plus />
            Viết bài mới
          </Button>
        }
      />

      <div className="mb-4 max-w-xs">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Tìm theo tiêu đề..."
        />
      </div>

      {loading ? (
        <LoadingBlock />
      ) : articles.length === 0 ? (
        <EmptyState title="Chưa có bài viết nào" />
      ) : (
        <>
          <TableWrapper>
            <Table>
              <Thead>
                <tr>
                  <Th className="w-24">Ảnh</Th>
                  <Th>Tiêu đề</Th>
                  <Th>Tác giả</Th>
                  <Th>Ngày đăng</Th>
                  <Th>Trạng thái</Th>
                  <Th className="w-24 text-right">Thao tác</Th>
                </tr>
              </Thead>
              <Tbody>
                {articles.map((article) => (
                  <Tr key={article.id}>
                    <Td>
                      <div className="h-12 w-20 overflow-hidden rounded bg-muted">
                        <SafeImage
                          src={article.image ?? ''}
                          alt={article.title}
                          className="size-full object-cover"
                        />
                      </div>
                    </Td>
                    <Td>
                      <p className="line-clamp-2 max-w-80 font-medium">{article.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">/{article.slug}</p>
                    </Td>
                    <Td className="text-muted-foreground">{article.author?.name ?? '—'}</Td>
                    <Td className="whitespace-nowrap text-muted-foreground">
                      {formatDate(article.publishedAt)}
                    </Td>
                    <Td>
                      {article.status ? (
                        <Badge variant="success">Đã đăng</Badge>
                      ) : (
                        <Badge variant="muted">Nháp</Badge>
                      )}
                    </Td>
                    <Td>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => void openEdit(article)}
                          aria-label="Sửa"
                        >
                          <Pencil />
                        </Button>
                        {canDelete ? (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-destructive"
                            onClick={() => setDeleting(article)}
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

          <div className="mt-4">
            <Pagination meta={meta} onChange={setPage} />
          </div>
        </>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          title={editingId ? 'Sửa bài viết' : 'Viết bài mới'}
          className="max-w-3xl"
        >
          <div className="space-y-4 p-4">
            <div>
              <Label htmlFor="title">Tiêu đề *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                placeholder="Chọn sofa cho phòng khách dưới 20m²"
              />
            </div>

            <div>
              <Label>Ảnh bìa</Label>
              <ImageUploader
                single
                value={form.image}
                onChange={(image) => setForm({ ...form, image })}
              />
            </div>

            <div>
              <Label htmlFor="summary">Mô tả ngắn</Label>
              <Textarea
                id="summary"
                rows={2}
                value={form.summary}
                onChange={(event) => setForm({ ...form, summary: event.target.value })}
                placeholder="Một hai câu tóm ý, hiện ở thẻ bài viết"
              />
            </div>

            <div>
              <Label>Nội dung *</Label>
              <RichTextEditor
                value={form.content}
                onChange={(content) => setForm({ ...form, content })}
                placeholder="Nội dung bài viết"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="publishedAt">Ngày đăng</Label>
                <Input
                  id="publishedAt"
                  type="date"
                  value={form.publishedAt}
                  onChange={(event) => setForm({ ...form, publishedAt: event.target.value })}
                />
              </div>
              <div className="flex items-end">
                <div className="w-full">
                  <SwitchField
                    label="Đăng bài"
                    description="Tắt để lưu nháp"
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
              {editingId ? 'Lưu thay đổi' : 'Đăng bài'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Xoá bài viết?"
        description={
          <>
            Bài viết <strong>{deleting?.title}</strong> sẽ bị xoá.
          </>
        }
        loading={removing}
        onConfirm={() => void remove()}
      />
    </div>
  );
};
