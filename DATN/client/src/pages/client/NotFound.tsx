import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const NotFoundPage = () => (
  <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
    <p className="font-display text-6xl font-bold text-primary">404</p>
    <h1 className="mt-3 text-2xl font-bold">Không tìm thấy trang</h1>
    <p className="mt-2 text-sm text-muted-foreground">
      Đường dẫn không tồn tại hoặc đã bị thay đổi.
    </p>
    <div className="mt-6 flex gap-2">
      <Button asChild>
        <Link to="/">Về trang chủ</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link to="/products">Xem sản phẩm</Link>
      </Button>
    </div>
  </div>
);
