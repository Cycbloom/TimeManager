// src/components/Tasks/TaskForm/FormProviderWrapper.tsx
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteFormData, noteFormSchema } from "../../types/notes";
import { ReactNode } from "react";

interface FormProviderWrapperProps {
  children: (methods: UseFormReturn<NoteFormData>) => ReactNode;
  defaultValues?: Partial<NoteFormData>;
}

export const FormProviderWrapper = ({
  children,
  defaultValues = { title: "", content: "", type: "article", tags: [] },
}: FormProviderWrapperProps) => {
  const methods = useForm<NoteFormData>({
    resolver: zodResolver(noteFormSchema),
    defaultValues,
  });

  return <FormProvider {...methods}>{children(methods)}</FormProvider>;
};
