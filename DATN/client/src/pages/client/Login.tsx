import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FieldError, Input, Label } from '@/components/ui/input';
import { Spinner } from '@/components/ui/feedback';
import { emailSchema } from '@/lib/validation';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearError, isStaff, login } from '@/store/slices/authSlice';

const schema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

type FormValues = z.infer<typeof schema>;

/** Tài khoản demo để chấm bài nhanh, không phải bịa dữ liệu. */
const DEMO_ACCOUNTS = [
  { email: 'superadmin@noithat.vn', label: 'Super Admin' },
  { email: 'admin@noithat.vn', label: 'Admin' },
  { email: 'editor@noithat.vn', label: 'Biên tập' },
  { email: 'user@noithat.vn', label: 'Khách hàng' },
];

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { status, submitting, error, user } = useAppSelector((state) => state.auth);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  if (status === 'authenticated' && user) {
    const from = (location.state as { from?: string } | null)?.from;
    return <Navigate to={from ?? (isStaff(user.role) ? '/admin' : '/')} replace />;
  }

  const onSubmit = (values: FormValues) => void dispatch(login(values));

  const fillDemo = (email: string) => {
    form.setValue('email', email);
    form.setValue('password', '123456');
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Đăng nhập</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="ban@example.com"
                {...form.register('email')}
              />
              <FieldError message={form.formState.errors.email?.message} />
            </div>

            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••"
                {...form.register('password')}
              />
              <FieldError message={form.formState.errors.password?.message} />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={submitting}>
              {submitting ? <Spinner /> : null}
              Đăng nhập
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            Tài khoản demo (mật khẩu: 123456) — bấm để điền nhanh
          </p>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_ACCOUNTS.map((account) => (
              <Button
                key={account.email}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fillDemo(account.email)}
              >
                {account.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
