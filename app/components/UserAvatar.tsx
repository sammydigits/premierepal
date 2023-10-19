import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import Link from "next/link";
import { useClerk } from "@clerk/clerk-react";

interface UserAvatarProps {
  user: any;
}

export default function UserAvatar({ user }: UserAvatarProps) {
  const { signOut } = useClerk();

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={user.profileImageUrl}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>
          <DropdownItem key="account">
            <Link href="/account">My Account</Link>
          </DropdownItem>
          <DropdownItem key="notifications">
            <Link href="/dashboard">Dashboard</Link>
          </DropdownItem>
          <DropdownItem key="analytics">
            <Link href="/billing">Billing</Link>
          </DropdownItem>
          <DropdownItem key="support">
            <Link href="/support">Support</Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
