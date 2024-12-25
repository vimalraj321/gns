"use client";

import { b2f, b2i } from "@/hooks/usePresale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { usePresale } from "@/providers/provider";

export interface Activity {
  id: any;
  refId: any;
  tokenAmt: any;
  usdtAmt: any;
  bnbAmt: any;
  mode: any;
}

interface ActivitiesTableProps {
  activities: Activity[];
  length: number;
}

export function ActivitiesTable({ activities, length }: ActivitiesTableProps) {
  const rowsPerPage = 10; // Number of rows per page
  const { curPage, setCurPage } = usePresale();

  // Ensure current page is initialized correctly
  const currentPage = curPage || 1;

  // Calculate total pages
  const totalPages = Math.ceil(length / rowsPerPage);

  // Pagination handlers
  const handlePreviousPage = () => setCurPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="rounded-xl border border-[#00d4ff]/20 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#00d4ff]/20">
            <TableHead className="text-gray-400">User ID</TableHead>
            <TableHead className="text-gray-400">Type</TableHead>
            <TableHead className="text-right text-gray-400">Reward</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities && activities.length > 0 ? (
            activities.map((activity, id) => {
              const {
                refId = 0,
                id: activityId = 0,
                tokenAmt = 0,
                usdtAmt = 0,
                bnbAmt = 0,
                mode = 0,
              } = activity;

              return (
                <TableRow
                  key={id}
                  className="border-b text-left border-[#00d4ff]/20 bg-black/20 hover:bg-card/5"
                >
                  <TableCell>
                    {mode === 1
                      ? parseInt(refId.toString(), 10)
                      : parseInt(activityId.toString(), 10)}
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">
                      {mode === 0
                        ? "Investment"
                        : mode === 1
                        ? "Referral"
                        : "Dividend"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium text-primary">
                    {b2f(tokenAmt).toFixed(2)} XEE{" "}
                    {mode === 1
                      ? b2f(bnbAmt) === 0
                        ? `+ ${b2f(usdtAmt).toFixed(2)} USDT`
                        : `+ ${b2f(bnbAmt).toFixed(4)} BNB`
                      : ""}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-gray-400">
                No activities found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-primary text-black rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-primary text-black rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
