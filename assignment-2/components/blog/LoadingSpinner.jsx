import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
