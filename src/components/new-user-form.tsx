import { cn } from "@/lib/utils.ts";
import { NewUser, NewUserSchema } from "@/schemas/new-user.schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { useState } from "react";

type Props = { className?: string };

function simulateServerRequest(data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success or failure
      const isSuccess = false;
      if (isSuccess) {
        resolve({ message: "Success", data });
      } else {
        reject({ message: "Error", error: "Something went wrong" });
      }
    }, 2000); // Simulate a 2-second delay
  });
}

function NewUserForm({ className }: Props) {
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm<NewUser>({
    resolver: zodResolver(NewUserSchema),
    defaultValues: {
      name: "",
      email: "",
      age: 18,
    },
  });

  const errors = form.formState.errors;

  const onSubmit = async (values: NewUser) => {
    setSubmitting(true);
    try {
      const response = await simulateServerRequest(values);
      console.log(response);
    } catch (error) {
      form.setError("root", { message: "Error" });
      console.error(error);
      console.log(form.formState.errors);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={cn(className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder={"Name"} {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type={"email"} placeholder={"email"} {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"age"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type={"number"} placeholder={"age"} {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          {errors && errors.root && <FormMessage>{errors.root.message}</FormMessage>}
          <Button disabled={isSubmitting} type={"submit"}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default NewUserForm;
