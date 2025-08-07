"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { MoreHorizontal } from "lucide-react";
import type { Certificate } from "@/lib/mock-data";

interface CertificateManagementTableProps {
  certificates: Certificate[];
}

export function CertificateManagementTable({
  certificates,
}: CertificateManagementTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterIssueDate, setFilterIssueDate] = useState("");

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.region.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || cert.type === filterType;
    const matchesStatus =
      filterStatus === "all" || cert.status === filterStatus;
    const matchesIssueDate =
      filterIssueDate === "" || cert.issueDate === filterIssueDate;

    return matchesSearch && matchesType && matchesStatus && matchesIssueDate;
  });

  const handleTypeClick = (type: string) => {
    if (type === "Business License") {
      router.push("/business-license");
    } else if (type === "Taxpayer Registration") {
      router.push("/dashboard/taxPayer/registration?tab=certificate");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search certificates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm flex-1"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border rounded-md bg-white"
        >
          <option value="all">All Types</option>
          <option value="Business License">Business License</option>
          <option value="Taxpayer Registration">Taxpayer Registration</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded-md bg-white"
        >
          <option value="all">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Registered">Registered</option>
          <option value="Pending">Pending</option>
          <option value="Expired">Expired</option>
          <option value="Suspended">Suspended</option>
        </select>
        <Input
          type="date"
          value={filterIssueDate}
          onChange={(e) => setFilterIssueDate(e.target.value)}
          className="max-w-[180px]"
        />
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Identifier</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>
                    <Badge
                      variant={
                        cert.type === "Business License" ? "default" : "outline"
                      }
                      className="cursor-pointer hover:bg-blue-500 transition-colors"
                      onClick={() => handleTypeClick(cert.type)}
                    >
                      {cert.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{cert.name}</TableCell>
                  <TableCell>{cert.identifier}</TableCell>
                  <TableCell>{cert.issueDate}</TableCell>
                  <TableCell>{cert.region}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        cert.status === "Active" || cert.status === "Registered"
                          ? "default"
                          : cert.status === "Expired" ||
                            cert.status === "Suspended"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {cert.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            alert(`Viewing ${cert.type} for ${cert.name}`)
                          }
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            alert(`Editing ${cert.type} for ${cert.name}`)
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            alert(`Changing status for ${cert.name}`)
                          }
                        >
                          Change Status
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No certificates found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
