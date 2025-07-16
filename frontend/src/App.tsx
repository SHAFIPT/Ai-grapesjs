import { WebsiteGeneratorForm } from "./app/WebsiteGeneratorForm";
import { Toaster } from "@/components/ui/toaster";
function App() {
  return (
    <>
      <Toaster/>
      <main className="min-h-screen bg-background text-foreground">
        <WebsiteGeneratorForm />
      </main>
    </>
  );
}

export default App;
