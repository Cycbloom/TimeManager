// src/components/Tasks/TaskForm/FormProviderWrapper.tsx
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormData, taskFormSchema } from "../../../types/tasks";
import { ReactNode } from "react";

interface FormProviderWrapperProps {
  children: (methods: UseFormReturn<TaskFormData>) => ReactNode;
  defaultValues?: Partial<TaskFormData>;
}

export const FormProviderWrapper = ({
  children,
  defaultValues = {
    title: "",
    dueDate: new Date(),
    priority: "low",
    tags: [],
    estimatedHours: 1,
  },
}: FormProviderWrapperProps) => {
  // 确保 dueDate 是 Date 对象
  const processedDefaultValues = {
    ...defaultValues,
    dueDate: defaultValues.dueDate
      ? new Date(defaultValues.dueDate)
      : new Date(),
  };

  const methods = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: processedDefaultValues,
  });

  return <FormProvider {...methods}>{children(methods)}</FormProvider>;
};
