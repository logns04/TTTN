import { ImageOff } from 'lucide-react';
import { type ComponentProps, useState } from 'react';
import { resolveImageUrl } from '@/lib/imageUrl';
import { cn } from '@/lib/utils';

/**
 * Ảnh có fallback, và là nơi duy nhất ghép origin vào đường dẫn ảnh.
 *
 * Mọi ảnh trong app đều đi qua đây, nên chỉ cần một chỗ hiểu quy ước "DB lưu
 * đường dẫn tương đối cho ảnh local, URL tuyệt đối cho Cloudinary".
 *
 * Fallback cần thiết vì ảnh upload có thể bị mất (ví dụ sau khi redeploy trên
 * Render free tier) — lúc đó phải hiện placeholder chứ không để icon ảnh vỡ
 * của browser.
 */
export const SafeImage = ({
  className,
  alt,
  src,
  ...props
}: ComponentProps<'img'> & { alt: string }) => {
  const [failed, setFailed] = useState(false);
  const resolved = resolveImageUrl(typeof src === 'string' ? src : undefined);

  if (!resolved || failed) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted text-muted-foreground',
          className,
        )}
        aria-label={alt}
        role="img"
      >
        <ImageOff className="size-6 opacity-50" />
      </div>
    );
  }

  return (
    <img
      src={resolved}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
};
