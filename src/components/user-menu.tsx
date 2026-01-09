import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { PropsWithChildren } from "react";

export function UserMenu({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  const goProfile = () => navigate("/profile");
  const goSettings = () => navigate("/settings");
  const signOut = () => {
    // Replace with real sign-out logic
    navigate("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent className="left-2 w-52 bg-white rounded-lg shadow-md ring-1 ring-gray-100">
        <div className="p-2">
          <DropdownMenuItem onClick={goProfile}>My profile</DropdownMenuItem>
          <DropdownMenuItem onClick={goSettings}>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut} className="text-red-500">
            Sign out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
