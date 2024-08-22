import { cn } from "@/lib/utils.ts";
import NewUserForm from "@/components/new-user-form.tsx";

type Props = { className?: string };

function Create({ className }: Props) {
  return (
    <div className={cn(className)}>
      <NewUserForm />
    </div>
  );
}

export default Create;
