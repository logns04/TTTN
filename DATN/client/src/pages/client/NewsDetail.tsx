import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SafeImage } from '@/components/common/SafeImage';
import { Button } from '@/components/ui/button';
import { EmptyState, LoadingBlock } from '@/components/ui/feedback';
import { formatDate } from '@/lib/format';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { newsApi } from '@/services/shop.api';
import type { NewsDetail, NewsItem } from '@/types';

export const NewsDetailPage = () => {
  const { slug = '' } = useParams();
  const [article, setArticle] = useState<NewsDetail | null>(null);
  const [others, setOthers] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    window.scrollTo({ top: 0 });

    newsApi
      .detail(slug)
      .then((data) => {
        if (!cancelled) setArticle(data);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    newsApi
      .list({ limit: 4 })
      .then((result) => {
        if (!cancelled) setOthers(result.items.filter((item) => item.slug !== slug).slice(0, 3));
      })
      .catch(() => setOthers([]));

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useDocumentTitle(article?.title);

  if (loading) return <LoadingBlock label="Đang tải bài viết..." />;

  if (notFound || !article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          title="Không tìm thấy bài viết"
          action={
            <Button asChild>
              <Link to="/news">Về danh sách tin tức</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
        <Link to="/news">
          <ArrowLeft />
          Tất cả tin tức
        </Link>
      </Button>

      <article>
        <h1 className="text-2xl font-bold leading-snug sm:text-3xl">{article.title}</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {formatDate(article.publishedAt)}
          {article.author ? ` · ${article.author.name}` : ''}
        </p>

        {article.image ? (
          <div className="mt-5 overflow-hidden rounded-xl bg-muted">
            <SafeImage
              src={article.image}
              alt={article.title}
              className="aspect-[8/5] w-full object-cover"
            />
          </div>
        ) : null}

        {article.summary ? (
          <p className="mt-5 border-l-2 border-primary pl-4 text-base italic text-muted-foreground">
            {article.summary}
          </p>
        ) : null}

        <div
          className="prose-noithat mt-6"
          // Nội dung do biên tập viên nhập ở trang quản trị, không phải từ người dùng cuối.
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {others.length > 0 ? (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="mb-4 text-lg font-bold">Bài viết khác</h2>
          <div className="space-y-3">
            {others.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.slug}`}
                className="flex gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="size-20 shrink-0 overflow-hidden rounded bg-muted">
                  <SafeImage
                    src={item.image ?? ''}
                    alt={item.title}
                    className="size-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{formatDate(item.publishedAt)}</p>
                  <p className="mt-0.5 line-clamp-2 text-sm font-medium">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};
