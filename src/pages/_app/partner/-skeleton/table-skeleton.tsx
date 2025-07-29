'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PartnerTableSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-pulse">
      <div className="h-9 w-3/5 mx-auto">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-32 h-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-2">
        <CardHeader className="flex flex-col gap-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Skeleton className="w-48 h-6" />
          <Skeleton className="w-32 h-8" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-6" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
