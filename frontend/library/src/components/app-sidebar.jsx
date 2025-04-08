import * as React from "react";
import Logo from "@/assets/logo.jpg";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { BookOpen, BookA, User, IdCard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Sample data
const data = {
  navMain: [
    {
      title: "",
      url: "#",
      items: [
        { title: "Livros", url: "/livros", icon: <BookOpen size={18} /> },
        { title: "Autores", url: "/auth", icon: <BookA size={18} /> },
        { title: "Usuarios", url: "/usuarios", icon: <User size={18} /> },
        { title: "Cargos", url: "/cargos", icon: <IdCard size={18} /> },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const location = useLocation();

  return (
    <Sidebar {...props} className="shadow-2xl shadow-slate-400 text-white">
      <SidebarHeader className="bg-slate-900 border-b border-slate-700">
        <div className="w-full flex justify-center py-6">
          <Link to="/livros">
            <img
              src={Logo}
              alt="logo"
              className="w-20 h-20 rounded-full object-cover shadow-md ring-2 ring-white"
            />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-3 px-3 py-4 bg-slate-900">
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-sm uppercase text-slate-400 tracking-widest mb-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                    >
                      <Link
                        to={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-[16px] font-medium transition-all duration-200 
                          ${
                            location.pathname === item.url
                              ? "bg-slate-700 text-white"
                              : "hover:bg-slate-300 text-slate-300"
                          }`}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="bg-slate-900 border-t border-slate-700 p-4">
        <Button
          variant="outline"
          className="w-full bg-red-500 hover:bg-red-600 text-white border-transparent shadow"
        >
          Deslogar
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
