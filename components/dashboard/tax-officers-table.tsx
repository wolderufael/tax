"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, MoreHorizontal } from "lucide-react";
import type { TaxOfficer } from "@/lib/mock-data";

interface TaxOfficersTableProps {
  users: TaxOfficer[];
}

export function TaxOfficersTable({ users }: TaxOfficersTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.taxCenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.taxAuthority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.registrationDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.deregistrationDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.suspendedAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.registrationOfficer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search tax officers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Tax Center</TableHead>
              <TableHead>Tax Authority</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Deregistration Date</TableHead>
              <TableHead>Suspended Account</TableHead>
              <TableHead>Registration Officer</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.userName}
                  </TableCell>
                  <TableCell>{user.employeeId}</TableCell>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.taxCenter}</TableCell>
                  <TableCell>{user.taxAuthority}</TableCell>
                  <TableCell>{user.registrationDate}</TableCell>
                  <TableCell>{user.deregistrationDate}</TableCell>
                  <TableCell>{user.suspendedAccount}</TableCell>
                  <TableCell>{user.registrationOfficer}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.registrationOfficer === "Active"
                          ? "default"
                          : user.registrationOfficer === "Expired"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {/* {user.registrationOfficer} */}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
{/*                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            alert(`Viewing details for ${user.userName}`)
                          }
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => alert(`Editing ${user.userName}`)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => alert(`Deleting ${user.userName}`)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                        Reset Password
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No tax officers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
