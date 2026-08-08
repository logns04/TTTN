import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/feedback';
import { FieldError, Input, Label, Textarea } from '@/components/ui/input';
import { emailSchema, optionalPhoneSchema, optionalTextSchema, passwordSchema } from '@/lib/validation';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearError, register as registerThunk } from '@/store/slices/authSlice';

const schema = z
  .object({
    name: z.string().trim().min(2, 'Họ tên tối thiểu 2 ký tự').max(120),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    phone: optionalPhoneSchema,
    address: optionalTextSchema(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu nhập lại không khớp',
    path: ['confirmPassword'],
  });

type FormValues = z.input<typeof schema>;

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { status, submitting, error } = useAppSelector((state) => state.auth);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  if (status === 'authenticated') return <Navigate to="/" replace />;

  const onSubmit = form.handleSubmit((values) => {
    void dispatch(
      registerThunk({
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone || undefined,
        address: values.address || undefined,
      }),
    );
  });

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Tạo tài khoản</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div>
              <Label htmlFor="name">Họ và tên *</Label>
              <Input id="name" placeholder="Nguyễn Văn A" {...form.register('name')} />
              <FieldError message={form.formState.errors.name?.message} />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" autoComplete="email" {...form.register('email')} />
              <FieldError message={form.formState.errors.email?.message} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="password">Mật khẩu *</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...form.register('password')}
                />
                <FieldError message={form.formState.errors.password?.message} />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Nhập lại *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  {...form.register('confirmPassword')}
                />
                <FieldError message={form.formState.errors.confirmPassword?.message} />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input id="phone" placeholder="0912345678" {...form.register('phone')} />
              <FieldError message={form.formState.errors.phone?.message} />
            </div>

            <div>
              <Label htmlFor="address">Địa chỉ</Label>
              <Textarea
                id="address"
                rows={2}
                placeholder="Số nhà, đường, phường, quận, thành phố"
                {...form.register('address')}
              />
              <FieldError message={form.formState.errors.address?.message} />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={submitting}>
              {submitting ? <Spinner /> : null}
              Đăng ký
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
