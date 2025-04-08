import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
        <AppSidebar />
        <main className="flex-1 p-4 ">
          <SidebarTrigger />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
