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
import { Input, Label, Select, Textarea } from '@/components/ui/input';
import { Table, TableWrapper, Tbody, Td, Th, Thead, Tr } from '@/components/ui/table';
import { useDebounce } from '@/hooks/useDebounce';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { formatCurrency, formatNumber } from '@/lib/format';
import { getErrorMessage } from '@/services/axios';
import { categoryApi, productApi } from '@/services/catalog.api';
import type { Category, PageMeta, Product, ProductDetail } from '@/types';

interface FormState {
  name: string;
  categoryId: string;
  price: string;
  salePrice: string;
  quantity: string;
  shortDescription: string;
  description: string;
  images: string[];
  isNew: boolean;
  isSale: boolean;
  isBest: boolean;
  status: boolean;
}

const EMPTY_FORM: FormState = {
  name: '',
  categoryId: '',
  price: '',
  salePrice: '',
  quantity: '0',
  shortDescription: '',
  description: '',
  images: [],
  isNew: false,
  isSale: false,
  isBest: false,
  status: true,
};

const DEFAULT_META: PageMeta = { page: 1, limit: 10, total: 0, totalPages: 1 };

export const AdminProductsPage = () => {
  useDocumentTitle('Quản lý sản phẩm');

  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PageMeta>(DEFAULT_META);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  const [tree, setTree] = useState<Category[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ProductDetail | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<Product | null>(null);
  const [removing, setRemoving] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    categoryApi.tree(true).then(setTree).catch(() => setTree([]));
  }, []);

  useEffect(() => setPage(1), [debouncedSearch, categoryFilter]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    productApi
      .list({
        page,
        limit: 10,
        search: debouncedSearch || undefined,
        category: categoryFilter || undefined,
        all: true,
        sort: 'newest',
      })
      .then((result) => {
        if (cancelled) return;
        setProducts(result.items);
        setMeta(result.meta);
      })
      .catch((error) => {
        if (!cancelled) toast.error(getErrorMessage(error, 'Không tải được sản phẩm'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, debouncedSearch, categoryFilter, reloadKey]);

  /** Danh mục con phẳng — sản phẩm chỉ được gán vào danh mục con. */
  const subCategories = tree.flatMap((parent) =>
    (parent.children ?? []).map((child) => ({ ...child, parentName: parent.name })),
  );

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM, categoryId: String(subCategories[0]?.id ?? '') });
    setDialogOpen(true);
  };

  const openEdit = async (product: Product) => {
    try {
      const detail = await productApi.adminDetail(product.id);
      setEditing(detail);
      setForm({
        name: detail.name,
        categoryId: String(detail.categoryId),
        price: String(detail.price),
        salePrice: detail.salePrice ? String(detail.salePrice) : '',
        quantity: String(detail.quantity),
        shortDescription: detail.shortDescription ?? '',
        description: detail.description ?? '',
        images: detail.images.length > 0 ? detail.images.map((image) => image.url) : [detail.image],
        isNew: detail.isNew,
        isSale: detail.isSale,
        isBest: detail.isBest,
        status: detail.status,
      });
      setDialogOpen(true);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Không tải được sản phẩm'));
    }
  };

  const save = async () => {
    if (form.images.length === 0) {
      toast.error('Cần tải lên ít nhất một ảnh');
      return;
    }

    setSaving(true);
    try {
      const body = {
        name: form.name,
        categoryId: Number(form.categoryId),
        // Ảnh đầu tiên là ảnh đại diện, cả mảng là gallery.
        image: form.images[0],
        images: form.images,
        price: Number(form.price),
        salePrice: form.salePrice ? Number(form.salePrice) : null,
        quantity: Number(form.quantity),
        shortDescription: form.shortDescription || undefined,
        description: form.description || undefined,
        isNew: form.isNew,
        isSale: form.isSale,
        isBest: form.isBest,
        status: form.status,
      };

      if (editing) await productApi.update(editing.id, body);
      else await productApi.create(body);

      toast.success(editing ? 'Đã cập nhật sản phẩm' : 'Đã tạo sản phẩm');
      setDialogOpen(false);
      setReloadKey((key) => key + 1);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Lưu sản phẩm thất bại'));
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!deleting) return;
    setRemoving(true);
    try {
      await productApi.remove(deleting.id);
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
        title="Quản lý sản phẩm"
        description={loading ? 'Đang tải...' : `${meta.total} sản phẩm`}
        action={
          <Button onClick={openCreate}>
            <Plus />
            Thêm sản phẩm
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Tìm theo tên sản phẩm..."
          className="max-w-xs"
        />
        <Select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="max-w-56"
          aria-label="Lọc theo danh mục"
        >
          <option value="">Tất cả danh mục</option>
          {tree.map((parent) => (
            <optgroup key={parent.id} label={parent.name}>
              {(parent.children ?? []).map((child) => (
                <option key={child.id} value={child.slug}>
                  {child.name}
                </option>
              ))}
            </optgroup>
          ))}
        </Select>
      </div>

      {loading ? (
        <LoadingBlock />
      ) : products.length === 0 ? (
        <EmptyState title="Chưa có sản phẩm nào" description="Bấm 'Thêm sản phẩm' để bắt đầu." />
      ) : (
        <>
          <TableWrapper>
            <Table>
              <Thead>
                <tr>
                  <Th className="w-16">Ảnh</Th>
                  <Th>Tên sản phẩm</Th>
                  <Th>Danh mục</Th>
                  <Th className="text-right">Giá bán</Th>
                  <Th className="text-right">Kho</Th>
                  <Th>Nhãn</Th>
                  <Th className="w-24 text-right">Thao tác</Th>
                </tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product.id}>
                    <Td>
                      <div className="size-11 overflow-hidden rounded bg-muted">
                        <SafeImage
                          src={product.image}
                          alt={product.name}
                          className="size-full object-cover"
                        />
                      </div>
                    </Td>
                    <Td>
                      <p className="line-clamp-2 max-w-72 font-medium">{product.name}</p>
                      {!product.status ? (
                        <Badge variant="muted" className="mt-1">
                          Đang ẩn
                        </Badge>
                      ) : null}
                    </Td>
                    <Td className="text-muted-foreground">{product.category.name}</Td>
                    <Td className="whitespace-nowrap text-right">
                      <span className="font-medium">{formatCurrency(product.effectivePrice)}</span>
                      {product.salePrice ? (
                        <span className="block text-xs text-muted-foreground line-through">
                          {formatCurrency(product.price)}
                        </span>
                      ) : null}
                    </Td>
                    <Td className="text-right">
                      <span className={product.quantity <= 5 ? 'text-destructive' : undefined}>
                        {formatNumber(product.quantity)}
                      </span>
                    </Td>
                    <Td>
                      <div className="flex flex-wrap gap-1">
                        {product.isNew ? <Badge variant="outline">Mới</Badge> : null}
                        {product.isSale ? <Badge variant="destructive">Sale</Badge> : null}
                        {product.isBest ? <Badge variant="success">Hot</Badge> : null}
                      </div>
                    </Td>
                    <Td>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => void openEdit(product)}
                          aria-label="Sửa"
                        >
                          <Pencil />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive"
                          onClick={() => setDeleting(product)}
                          aria-label="Xoá"
                        >
                          <Trash2 />
                        </Button>
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
          title={editing ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
          className="max-w-3xl"
        >
          <div className="space-y-4 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="name">Tên sản phẩm *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Sofa Băng Gỗ Sồi 3 Chỗ"
                />
              </div>

              <div>
                <Label htmlFor="categoryId">Danh mục *</Label>
                <Select
                  id="categoryId"
                  value={form.categoryId}
                  onChange={(event) => setForm({ ...form, categoryId: event.target.value })}
                >
                  <option value="">— Chọn danh mục —</option>
                  {tree.map((parent) => (
                    <optgroup key={parent.id} label={parent.name}>
                      {(parent.children ?? []).map((child) => (
                        <option key={child.id} value={child.id}>
                          {child.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity">Số lượng trong kho *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min={0}
                  value={form.quantity}
                  onChange={(event) => setForm({ ...form, quantity: event.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="price">Giá gốc (đ) *</Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  step={10000}
                  value={form.price}
                  onChange={(event) => setForm({ ...form, price: event.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="salePrice">Giá khuyến mãi (đ)</Label>
                <Input
                  id="salePrice"
                  type="number"
                  min={0}
                  step={10000}
                  value={form.salePrice}
                  onChange={(event) => setForm({ ...form, salePrice: event.target.value })}
                  placeholder="Để trống nếu không giảm giá"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Phải nhỏ hơn giá gốc. Giá này là giá khách thực trả.
                </p>
              </div>
            </div>

            <div>
              <Label>Ảnh sản phẩm *</Label>
              <ImageUploader
                value={form.images}
                onChange={(images) => setForm({ ...form, images })}
                max={8}
              />
            </div>

            <div>
              <Label htmlFor="shortDescription">Mô tả ngắn</Label>
              <Textarea
                id="shortDescription"
                rows={2}
                value={form.shortDescription}
                onChange={(event) => setForm({ ...form, shortDescription: event.target.value })}
                placeholder="Một câu nêu điểm mạnh chính, hiện ở thẻ sản phẩm"
              />
            </div>

            <div>
              <Label>Mô tả chi tiết</Label>
              <RichTextEditor
                value={form.description}
                onChange={(description) => setForm({ ...form, description })}
                placeholder="Chất liệu, kích thước, bảo hành..."
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <SwitchField
                label="Sản phẩm mới"
                description="Hiện ở mục Sản phẩm mới"
                checked={form.isNew}
                onChange={(isNew) => setForm({ ...form, isNew })}
              />
              <SwitchField
                label="Bán chạy"
                description="Hiện ở mục Bán chạy nhất"
                checked={form.isBest}
                onChange={(isBest) => setForm({ ...form, isBest })}
              />
              <SwitchField
                label="Đang giảm giá"
                description="Hiện ở mục Đang giảm giá"
                checked={form.isSale}
                onChange={(isSale) => setForm({ ...form, isSale })}
              />
              <SwitchField
                label="Hiển thị"
                description="Tắt để ẩn khỏi trang bán hàng"
                checked={form.status}
                onChange={(status) => setForm({ ...form, status })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-border p-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
              Huỷ
            </Button>
            <Button onClick={() => void save()} disabled={saving}>
              {saving ? <Spinner /> : null}
              {editing ? 'Lưu thay đổi' : 'Tạo sản phẩm'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Xoá sản phẩm?"
        description={
          <>
            Sản phẩm <strong>{deleting?.name}</strong> sẽ bị xoá khỏi hệ thống. Đơn hàng cũ vẫn giữ
            nguyên thông tin đã đặt.
          </>
        }
        loading={removing}
        onConfirm={() => void remove()}
      />
    </div>
  );
};
