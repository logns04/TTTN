import { Pencil, Plus, ShieldAlert, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SwitchField } from '@/components/admin/SwitchField';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Pagination } from '@/components/common/Pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { EmptyState, LoadingBlock, Spinner } from '@/components/ui/feedback';
import { Input, Label, Select, Textarea } from '@/components/ui/input';
import { Table, TableWrapper, Tbody, Td, Th, Thead, Tr } from '@/components/ui/table';
import { useDebounce } from '@/hooks/useDebounce';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ROLE_LABELS } from '@/lib/constants';
import { formatDate } from '@/lib/format';
import { getErrorMessage } from '@/services/axios';
import { userApi } from '@/services/shop.api';
import { useAppSelector } from '@/store';
import type { PageMeta, Role, User } from '@/types';

interface FormState {
  name: string;
  email: string;
  password: string;
  role: Role;
  phone: string;
  address: string;
  isActive: boolean;
}

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  password: '',
  role: 'USER',
  phone: '',
  address: '',
  isActive: true,
};

const ROLE_BADGE: Record<Role, 'default' | 'outline' | 'muted' | 'success'> = {
  SUPERADMIN: 'default',
  ADMIN: 'success',
  EDITOR: 'outline',
  USER: 'muted',
};

const DEFAULT_META: PageMeta = { page: 1, limit: 10, total: 0, totalPages: 1 };

export const AdminUsersPage = () => {
  useDocumentTitle('Quản lý người dùng');

  const currentUser = useAppSelector((state) => state.auth.user);
  // ADMIN chỉ được xem; mọi thao tác ghi thuộc SUPERADMIN (spec mục 6).
  const canWrite = currentUser?.role === 'SUPERADMIN';

  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<PageMeta>(DEFAULT_META);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | ''>('');
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<User | null>(null);
  const [removing, setRemoving] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => setPage(1), [debouncedSearch, roleFilter]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    userApi
      .list({ page, limit: 10, search: debouncedSearch || undefined, role: roleFilter || undefined })
      .then((result) => {
        if (cancelled) return;
        setUsers(result.items);
        setMeta(result.meta);
      })
      .catch((error) => {
        if (!cancelled) toast.error(getErrorMessage(error, 'Không tải được người dùng'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, debouncedSearch, roleFilter, reloadKey]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEdit = (user: User) => {
    setEditing(user);
    setForm({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      phone: user.phone ?? '',
      address: user.address ?? '',
      isActive: user.isActive,
    });
    setDialogOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const body = {
        name: form.name,
        email: form.email,
        role: form.role,
        phone: form.phone || undefined,
        address: form.address || undefined,
        isActive: form.isActive,
        // Sửa: chuỗi rỗng = giữ mật khẩu cũ. Tạo mới: bắt buộc có.
        ...(form.password ? { password: form.password } : {}),
      };

      if (editing) await userApi.update(editing.id, body);
      else await userApi.create(body);

      toast.success(editing ? 'Đã cập nhật người dùng' : 'Đã tạo người dùng');
      setDialogOpen(false);
      setReloadKey((key) => key + 1);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Lưu người dùng thất bại'));
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!deleting) return;
    setRemoving(true);
    try {
      await userApi.remove(deleting.id);
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
        title="Quản lý người dùng"
        description={loading ? 'Đang tải...' : `${meta.total} tài khoản`}
        action={
          canWrite ? (
            <Button onClick={openCreate}>
              <Plus />
              Thêm người dùng
            </Button>
          ) : null
        }
      />

      {!canWrite ? (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
          <ShieldAlert className="mt-0.5 size-4 shrink-0" />
          Bạn đang ở chế độ chỉ xem. Chỉ Super Admin được tạo, sửa hoặc xoá tài khoản.
        </div>
      ) : null}

      <div className="mb-4 flex flex-wrap gap-2">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Tìm theo tên hoặc email..."
          className="max-w-xs"
        />
        <Select
          value={roleFilter}
          onChange={(event) => setRoleFilter(event.target.value as Role | '')}
          className="max-w-44"
          aria-label="Lọc theo vai trò"
        >
          <option value="">Tất cả vai trò</option>
          {(Object.keys(ROLE_LABELS) as Role[]).map((role) => (
            <option key={role} value={role}>
              {ROLE_LABELS[role]}
            </option>
          ))}
        </Select>
      </div>

      {loading ? (
        <LoadingBlock />
      ) : users.length === 0 ? (
        <EmptyState title="Không tìm thấy người dùng nào" />
      ) : (
        <>
          <TableWrapper>
            <Table>
              <Thead>
                <tr>
                  <Th>Họ tên</Th>
                  <Th>Email</Th>
                  <Th>Vai trò</Th>
                  <Th>Điện thoại</Th>
                  <Th className="text-right">Đơn hàng</Th>
                  <Th>Trạng thái</Th>
                  <Th>Ngày tạo</Th>
                  {canWrite ? <Th className="w-24 text-right">Thao tác</Th> : null}
                </tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user.id}>
                    <Td>
                      <span className="font-medium">{user.name}</span>
                      {user.id === currentUser?.id ? (
                        <Badge variant="outline" className="ml-2">
                          Bạn
                        </Badge>
                      ) : null}
                    </Td>
                    <Td className="text-muted-foreground">{user.email}</Td>
                    <Td>
                      <Badge variant={ROLE_BADGE[user.role]}>{ROLE_LABELS[user.role]}</Badge>
                    </Td>
                    <Td className="text-muted-foreground">{user.phone ?? '—'}</Td>
                    <Td className="text-right">{user._count?.orders ?? 0}</Td>
                    <Td>
                      {user.isActive ? (
                        <Badge variant="success">Hoạt động</Badge>
                      ) : (
                        <Badge variant="destructive">Đã khoá</Badge>
                      )}
                    </Td>
                    <Td className="whitespace-nowrap text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </Td>
                    {canWrite ? (
                      <Td>
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openEdit(user)}
                            aria-label="Sửa"
                          >
                            <Pencil />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-destructive"
                            onClick={() => setDeleting(user)}
                            disabled={user.id === currentUser?.id}
                            aria-label="Xoá"
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </Td>
                    ) : null}
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
        <DialogContent title={editing ? 'Sửa người dùng' : 'Thêm người dùng'}>
          <div className="space-y-4 p-4">
            <div>
              <Label htmlFor="name">Họ và tên *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="password">
                Mật khẩu {editing ? '(để trống nếu không đổi)' : '*'}
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                placeholder={editing ? 'Giữ mật khẩu hiện tại' : 'Tối thiểu 6 ký tự'}
              />
            </div>

            <div>
              <Label htmlFor="role">Vai trò *</Label>
              <Select
                id="role"
                value={form.role}
                onChange={(event) => setForm({ ...form, role: event.target.value as Role })}
                disabled={editing?.id === currentUser?.id}
              >
                {(Object.keys(ROLE_LABELS) as Role[]).map((role) => (
                  <option key={role} value={role}>
                    {ROLE_LABELS[role]}
                  </option>
                ))}
              </Select>
              {editing?.id === currentUser?.id ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  Không thể tự thay đổi vai trò của chính mình.
                </p>
              ) : null}
            </div>

            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                placeholder="0912345678"
              />
            </div>

            <div>
              <Label htmlFor="address">Địa chỉ</Label>
              <Textarea
                id="address"
                rows={2}
                value={form.address}
                onChange={(event) => setForm({ ...form, address: event.target.value })}
              />
            </div>

            <SwitchField
              label="Cho phép đăng nhập"
              description="Tắt để khoá tài khoản mà vẫn giữ lịch sử đơn hàng"
              checked={form.isActive}
              onChange={(isActive) => setForm({ ...form, isActive })}
            />
          </div>

          <div className="flex justify-end gap-2 border-t border-border p-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
              Huỷ
            </Button>
            <Button onClick={() => void save()} disabled={saving}>
              {saving ? <Spinner /> : null}
              {editing ? 'Lưu thay đổi' : 'Tạo người dùng'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Xoá người dùng?"
        description={
          <>
            Tài khoản <strong>{deleting?.name}</strong> sẽ bị xoá. Nếu người này đã có đơn hàng, hệ
            thống sẽ chặn xoá — hãy khoá tài khoản thay vì xoá.
          </>
        }
        loading={removing}
        onConfirm={() => void remove()}
      />
    </div>
  );
};
