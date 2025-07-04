import { Home, Activity, History, Settings, Share } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  {
    path: "/",
    icon: Home,
    label: "Home",
  },
  {
    path: "/live",
    icon: Activity,
    label: "Live Data",
  },
  {
    path: "/history",
    icon: History,
    label: "History",
  },
  {
    path: "/share",
    icon: Share,
    label: "Share",
  },
  {
    path: "/settings",
    icon: Settings,
    label: "Settings",
  },
];

export default function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center py-3 px-4 min-w-0 flex-1 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon
                className={cn("h-5 w-5 mb-1", isActive && "fill-current")}
              />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
