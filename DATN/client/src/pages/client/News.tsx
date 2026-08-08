import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Pagination } from '@/components/common/Pagination';
import { SafeImage } from '@/components/common/SafeImage';
import { EmptyState, LoadingBlock } from '@/components/ui/feedback';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/format';
import { useDebounce } from '@/hooks/useDebounce';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { getErrorMessage } from '@/services/axios';
import { newsApi } from '@/services/shop.api';
import type { NewsItem, PageMeta } from '@/types';

const DEFAULT_META: PageMeta = { page: 1, limit: 9, total: 0, totalPages: 1 };

export const NewsPage = () => {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [meta, setMeta] = useState<PageMeta>(DEFAULT_META);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search, 400);

  useDocumentTitle('Tin tức');

  useEffect(() => setPage(1), [debouncedSearch]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    newsApi
      .list({ page, limit: 9, search: debouncedSearch || undefined })
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
  }, [page, debouncedSearch]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Tin tức &amp; kinh nghiệm</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Kiến thức chọn và dùng nội thất, cập nhật thường xuyên
          </p>
        </div>

        <div className="w-full max-w-xs">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm bài viết..."
            aria-label="Tìm bài viết"
          />
        </div>
      </div>

      {loading ? (
        <LoadingBlock />
      ) : articles.length === 0 ? (
        <EmptyState
          title="Không có bài viết nào"
          description={search ? 'Thử từ khoá khác xem sao.' : 'Bài viết sẽ xuất hiện ở đây.'}
        />
      ) : (
        <>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
              >
                <div className="aspect-[8/5] overflow-hidden bg-muted">
                  <SafeImage
                    src={article.image ?? ''}
                    alt={article.title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs text-muted-foreground">
                    {formatDate(article.publishedAt)}
                    {article.author ? ` · ${article.author.name}` : ''}
                  </p>
                  <h2 className="mt-1.5 line-clamp-2 text-base font-semibold group-hover:text-primary">
                    {article.title}
                  </h2>
                  {article.summary ? (
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {article.summary}
                    </p>
                  ) : null}
                  <span className="mt-3 text-sm font-medium text-primary">Đọc tiếp →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Pagination meta={meta} onChange={setPage} />
          </div>
        </>
      )}
    </div>
  );
};
