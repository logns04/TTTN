import { Palette, RotateCcw, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SwitchField } from '@/components/admin/SwitchField';
import { ImageUploader } from '@/components/common/ImageUploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingBlock, Spinner } from '@/components/ui/feedback';
import { Input, Label } from '@/components/ui/input';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { getErrorMessage } from '@/services/axios';
import { settingsApi } from '@/services/shop.api';
import { useAppDispatch } from '@/store';
import { applySettings } from '@/store/slices/settingsSlice';
import type { AdminSetting } from '@/types';

/** Vài màu nhấn gợi ý, tông gỗ và trung tính phù hợp nội thất. */
const COLOR_PRESETS = [
  { value: '#8B5E3C', label: 'Nâu gỗ' },
  { value: '#2F6F4E', label: 'Xanh rừng' },
  { value: '#1F4E79', label: 'Xanh navy' },
  { value: '#8A2F3B', label: 'Đỏ rượu' },
  { value: '#6B5B95', label: 'Tím khói' },
  { value: '#3F3B36', label: 'Than chì' },
];

export const AdminAppearancePage = () => {
  useDocumentTitle('Quản lý giao diện');

  const dispatch = useAppDispatch();
  const [settings, setSettings] = useState<AdminSetting[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    settingsApi
      .getForAdmin()
      .then((items) => {
        setSettings(items);
        setValues(Object.fromEntries(items.map((item) => [item.key, item.value])));
      })
      .catch((error) => toast.error(getErrorMessage(error, 'Không tải được cấu hình')))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const setValue = (key: string, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  const save = async () => {
    setSaving(true);
    try {
      const updated = await settingsApi.update(values);
      setSettings(updated);
      // Áp ngay vào store để header, logo và màu nhấn đổi mà không cần F5.
      dispatch(applySettings(Object.fromEntries(updated.map((item) => [item.key, item.value]))));
      toast.success('Đã lưu cấu hình giao diện');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Lưu cấu hình thất bại'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingBlock label="Đang tải cấu hình..." />;

  const byType = (type: AdminSetting['type']) => settings.filter((item) => item.type === type);

  const dirty = settings.some((item) => values[item.key] !== item.value);

  return (
    <div className="max-w-3xl space-y-4">
      <AdminPageHeader
        title="Quản lý giao diện"
        description="Đổi logo, màu nhấn và bật/tắt các mục ở trang chủ"
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={load} disabled={saving || !dirty}>
              <RotateCcw />
              Hoàn tác
            </Button>
            <Button onClick={() => void save()} disabled={saving || !dirty}>
              {saving ? <Spinner /> : <Save />}
              Lưu cấu hình
            </Button>
          </div>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Thông tin website</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {byType('TEXT').map((setting) => (
            <div key={setting.key}>
              <Label htmlFor={setting.key}>{setting.label}</Label>
              <Input
                id={setting.key}
                value={values[setting.key] ?? ''}
                onChange={(event) => setValue(setting.key, event.target.value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hình ảnh</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {byType('IMAGE').map((setting) => (
            <div key={setting.key}>
              <Label>{setting.label}</Label>
              <ImageUploader
                single
                value={values[setting.key] ? [values[setting.key]!] : []}
                onChange={(urls) => setValue(setting.key, urls[0] ?? '')}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Màu nhấn</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {byType('COLOR').map((setting) => {
            const current = values[setting.key] ?? '#8B5E3C';
            return (
              <div key={setting.key}>
                <Label htmlFor={setting.key}>{setting.label}</Label>

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    id={setting.key}
                    type="color"
                    value={current}
                    onChange={(event) => setValue(setting.key, event.target.value)}
                    className="h-10 w-14 cursor-pointer rounded-md border border-input bg-card p-1"
                    aria-label={setting.label}
                  />
                  <Input
                    value={current}
                    onChange={(event) => setValue(setting.key, event.target.value)}
                    className="max-w-32 font-mono"
                    placeholder="#8B5E3C"
                  />
                  <div
                    className="flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-white"
                    style={{ backgroundColor: current }}
                  >
                    <Palette className="size-4" />
                    Xem trước
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setValue(setting.key, preset.value)}
                      className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs transition-colors hover:bg-muted"
                    >
                      <span
                        className="size-3.5 rounded-full"
                        style={{ backgroundColor: preset.value }}
                      />
                      {preset.label}
                    </button>
                  ))}
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  Màu này áp cho cả chế độ sáng và tối. Biểu đồ ở Tổng quan dùng màu riêng đã kiểm
                  tra tương phản, nên không đổi theo màu nhấn.
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Các mục ở trang chủ</CardTitle>
          <p className="text-xs text-muted-foreground">
            Tắt mục nào thì mục đó biến mất khỏi trang chủ
          </p>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2">
          {byType('BOOLEAN').map((setting) => (
            <SwitchField
              key={setting.key}
              label={setting.label}
              checked={values[setting.key] !== 'false'}
              onChange={(checked) => setValue(setting.key, checked ? 'true' : 'false')}
            />
          ))}
        </CardContent>
      </Card>

      {dirty ? (
        <div className="sticky bottom-4 flex items-center justify-between gap-3 rounded-xl border border-primary/30 bg-card p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">Có thay đổi chưa lưu</p>
          <Button onClick={() => void save()} disabled={saving}>
            {saving ? <Spinner /> : <Save />}
            Lưu cấu hình
          </Button>
        </div>
      ) : null}
    </div>
  );
};
