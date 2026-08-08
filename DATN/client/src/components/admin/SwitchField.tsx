import { Switch } from '@/components/ui/switch';

/** Một dòng công tắc có nhãn và mô tả, dùng cho các cờ trong form admin. */
export const SwitchField = ({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) => (
  <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-border p-3">
    <span>
      <span className="block text-sm font-medium">{label}</span>
      {description ? (
        <span className="block text-xs text-muted-foreground">{description}</span>
      ) : null}
    </span>
    <Switch checked={checked} onCheckedChange={onChange} />
  </label>
);
