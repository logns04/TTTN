import { ImagePlus, Star, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/feedback';
import { getErrorMessage } from '@/services/axios';
import { uploadApi } from '@/services/catalog.api';
import { cn } from '@/lib/utils';
import { SafeImage } from './SafeImage';

interface ImageUploaderProps {
  /** Danh sách URL ảnh. Ảnh đầu tiên là ảnh đại diện. */
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
  /** Chỉ cho một ảnh (banner, logo, ảnh tin tức). */
  single?: boolean;
}

/**
 * Upload ảnh lên backend rồi giữ lại URL. Component chỉ làm việc với URL, không
 * biết ảnh được lưu ở ổ đĩa hay Cloudinary — đó là việc của StorageProvider.
 */
export const ImageUploader = ({
  value,
  onChange,
  max = 8,
  single = false,
}: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const limit = single ? 1 : max;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const room = limit - value.length;
    if (room <= 0) {
      toast.error(`Tối đa ${limit} ảnh`);
      return;
    }

    const picked = Array.from(files).slice(0, room);
    setUploading(true);
    try {
      const uploaded =
        picked.length === 1
          ? [await uploadApi.single(picked[0]!)]
          : await uploadApi.multiple(picked);

      onChange([...value, ...uploaded.map((item) => item.url)]);
      toast.success(`Đã tải lên ${uploaded.length} ảnh`);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Tải ảnh thất bại'));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const removeAt = (index: number) => onChange(value.filter((_, i) => i !== index));

  /** Đưa ảnh lên đầu để làm ảnh đại diện. */
  const makePrimary = (index: number) => {
    if (index === 0) return;
    const next = [...value];
    const [picked] = next.splice(index, 1);
    onChange([picked!, ...next]);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="group relative size-20 overflow-hidden rounded-md border border-border"
          >
            <SafeImage src={url} alt={`Ảnh ${index + 1}`} className="size-full object-cover" />

            {index === 0 && !single ? (
              <span className="absolute inset-x-0 bottom-0 bg-primary/85 py-0.5 text-center text-[10px] font-medium text-primary-foreground">
                Đại diện
              </span>
            ) : null}

            <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              {!single && index !== 0 ? (
                <button
                  type="button"
                  onClick={() => makePrimary(index)}
                  className="rounded bg-white/90 p-1 text-black"
                  title="Đặt làm ảnh đại diện"
                >
                  <Star className="size-3.5" />
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="rounded bg-white/90 p-1 text-destructive"
                title="Xoá ảnh"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>
        ))}

        {value.length < limit ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className={cn(
              'flex size-20 flex-col items-center justify-center gap-1 rounded-md border border-dashed border-border text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary',
              uploading && 'pointer-events-none opacity-60',
            )}
          >
            {uploading ? <Spinner /> : <ImagePlus className="size-5" />}
            {uploading ? 'Đang tải' : 'Thêm ảnh'}
          </button>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple={!single}
        className="hidden"
        onChange={(event) => void handleFiles(event.target.files)}
      />

      <p className="text-xs text-muted-foreground">
        JPG, PNG, WEBP hoặc GIF, mỗi ảnh tối đa 5MB
        {single ? '' : `. Tối đa ${limit} ảnh, ảnh đầu tiên là ảnh đại diện`}
      </p>
    </div>
  );
};
