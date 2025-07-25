'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function BusinessDashboardSkeleton() {
  return (
    <div className="w-full min-h-screen px-4 py-8 sm:px-6 lg:px-24 lg:py-16 flex flex-col items-center gap-6 lg:gap-10">
      <div className="w-full max-w-7xl flex flex-col gap-6">
        <h1 className="text-center text-3xl font-semibold">
          <Skeleton className="w-80 h-8 mx-auto" />
        </h1>

        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>

        <div className="flex justify-between items-center gap-4">
          <Skeleton className="w-40 h-10" />
          <Skeleton className="w-32 h-10" />
        </div>

        <Card className="w-full">
          <CardHeader className="flex flex-col gap-4">
            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                  <Skeleton className="w-64 h-6" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="w-[500px] max-w-full h-4" />
                  <Skeleton className="w-[400px] max-w-full h-4 mt-1" />
                </CardDescription>
              </div>

              <div className="flex gap-2 bg-muted rounded-lg p-1">
                <Skeleton className="w-32 h-8 rounded-md" />
                <Skeleton className="w-32 h-8 rounded-md" />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-4 mt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-md" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
