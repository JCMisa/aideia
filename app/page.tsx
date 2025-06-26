import ModeToggle from "@/components/custom/ModeToggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <ModeToggle />
      <Button>Click Me</Button>
      <div className="min-h-32 min-w-32 max-h-32 max-w-32 rounded-lg bg-primary-50" />
      <div className="min-h-32 min-w-32 max-h-32 max-w-32 rounded-lg bg-primary-100" />
      <div className="min-h-32 min-w-32 max-h-32 max-w-32 rounded-lg bg-primary-200" />
      <div className="min-h-32 min-w-32 max-h-32 max-w-32 rounded-lg bg-primary-300" />
      <div className="min-h-32 min-w-32 max-h-32 max-w-32 rounded-lg bg-primary-400" />
      <div className="min-h-32 min-w-32 max-h-32 max-w-32 rounded-lg bg-primary-500" />
      <div className="min-h-32 min-w-32 max-h-32 max-w-32 rounded-lg bg-primary-600" />
      <div className="min-h-32 min-w-32 max-h-32 max-w-32 rounded-lg bg-primary-700" />
      <div className="min-h-32 min-w-32 max-h-32 max-w-32 rounded-lg bg-primary-800" />
      <div className="min-h-32 min-w-32 max-h-32 max-w-32 rounded-lg bg-primary-900" />
      <div className="min-h-32 min-w-32 max-h-32 max-w-32 rounded-lg bg-primary-950" />
    </div>
  );
}
