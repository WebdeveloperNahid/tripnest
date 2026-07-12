"use client";

import type { ComponentType, SVGProps } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  Plus,
  ListCheck,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { RiSideBarFill } from "react-icons/ri";
import { useSession } from "@/lib/auth-client";

type NavItem = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  console.log(session,"role===")

  const isAdmin = (session?.user as { role?: string })?.role === "admin";

  const userItems: NavItem[] = [
    { icon: House, label: "Home", href: "/" },
    { icon: Person, label: "Browse-Tours", href: "/dashboard/admin/all-tours" },
    { icon: Envelope, label: "Manage-Tours", href: "/dashboard/manage-tours" },
    { icon: Gear, label: "Booking-Request", href: "/dashboard/admin/booking-request" },
  ];

  const adminItems: NavItem[] = [
    { icon: House, label: "Home", href: "/" },
    { icon: Plus, label: "Add Tour", href: "/dashboard/admin/add-tours" },
    { icon: ListCheck, label: "Manage Tours", href: "/dashboard/admin/manage-tours" },
    { icon: Gear, label: "Booking-Request", href: "/dashboard/admin/booking-request" },
  ];

  const items = isAdmin ? adminItems : userItems;

  const renderLinks = (list: NavItem[]) => (
    <nav className="flex flex-col gap-1">
      {list.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
              isActive
                ? "bg-default text-foreground font-medium"
                : "text-foreground hover:bg-default"
            }`}
          >
            <item.icon className="size-4 text-muted" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const NavContent = (
    <div className="flex flex-col gap-6">
      <div>
        <p className="px-3 mb-1 text-xs font-semibold text-muted uppercase">
          {isAdmin ? "Admin" : "User"}
        </p>
        {renderLinks(items)}
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-52 flex-shrink-0 border-r border-slate-200 bg-white p-3 lg:block">
        {NavContent}
      </aside>

      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <RiSideBarFill />
          SideBar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{NavContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}