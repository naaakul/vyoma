interface LiveBadgeProps {
  isLive: boolean
}

export function LiveBadge({ isLive }: LiveBadgeProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
      {isLive ? (
        <>
          <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-500">LIVE</span>
        </>
      ) : (
        <>
          <span className="inline-block h-2 w-2 rounded-full bg-muted-foreground" />
          <span className="text-muted-foreground">STALE</span>
        </>
      )}
    </div>
  )
}
