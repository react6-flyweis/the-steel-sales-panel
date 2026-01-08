import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  const navigate = useNavigate();

  const goProfile = () => navigate("/profile");
  const goSettings = () => navigate("/settings");
  const signOut = () => {
    // Replace with real sign-out logic
    navigate("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer" role="button">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Admin Panel</h2>
            <p className="text-xs text-gray-500">admin@steelpro.com</p>
          </div>
        </div>
      </DropdownMenuTrigger>

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
