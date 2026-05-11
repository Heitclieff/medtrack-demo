import { useEffect, useCallback } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';

interface UseFormModalOptions<T extends Record<string, any>> {
  schema: ZodType<T, any, any>;
  defaultValues: T;
  open: boolean;
  onComplete?: () => void;
  initialData?: Partial<T> | null;
}

interface UseFormModalReturn<T extends Record<string, any>> extends UseFormReturn<T> {
  onSubmit: (handler: (data: T) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export function useFormModal<T extends Record<string, any>>({
  schema,
  defaultValues,
  open,
  initialData,
}: UseFormModalOptions<T>): UseFormModalReturn<T> {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });

  useEffect(() => {
    if (open) {
      form.reset((initialData ? { ...defaultValues, ...initialData } : defaultValues) as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]); 
  
  // Update form if initialData changes while CLOSED, 
  // but if OPEN, we don't want to reset user input.
  useEffect(() => {
    if (!open && initialData) {
      form.reset({ ...defaultValues, ...initialData } as any);
    }
  }, [initialData, open, defaultValues, form]);

  const onSubmit = useCallback(
    (handler: (data: T) => void) => form.handleSubmit(handler),
    [form.handleSubmit] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return {
    ...form,
    onSubmit,
  };
}
