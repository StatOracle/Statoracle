// components/waitlist/RecentSignups.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignupDisplayUser } from "@/types/waitlist";

export function RecentSignups() {
  const [users, setUsers] = useState<SignupDisplayUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState<SignupDisplayUser | null>(null);

  useEffect(() => {
    const fetchRecentSignups = async () => {
      try {
        const response = await fetch("/api/recent-signups");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Failed to fetch recent signups", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentSignups();

    // Set up SSE connection for real-time updates
    const eventSource = new EventSource("/api/waitlist-events");

    eventSource.onmessage = (event) => {
      const newSignup = JSON.parse(event.data);
      setNewUser(newSignup);

      setTimeout(() => {
        setUsers((prev) => [newSignup, ...prev.slice(0, 4)]);
        setNewUser(null);
      }, 2000);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex animate-pulse items-center gap-4 py-2">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-8 rounded-full bg-neutral-200" />
          ))}
        </div>
        <div className="h-4 w-40 rounded bg-neutral-200"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 py-2">
      <div className="relative flex -space-x-2">
        {users.slice(0, 5).map((user, index) => (
          <Avatar key={user.id} className="h-8 w-8 border-2 border-white">
            {user.avatarUrl ? (
              <AvatarImage src={user.avatarUrl} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-neutral-100 text-xs text-neutral-800">
                {user.initials}
              </AvatarFallback>
            )}
          </Avatar>
        ))}

        <AnimatePresence>
          {newUser && (
            <motion.div
              className="absolute -top-12 left-0"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2 rounded-lg bg-white p-2 whitespace-nowrap shadow-md">
                <Avatar className="h-6 w-6">
                  {newUser.avatarUrl ? (
                    <AvatarImage src={newUser.avatarUrl} alt={newUser.name} />
                  ) : (
                    <AvatarFallback className="bg-neutral-100 text-xs text-neutral-800">
                      {newUser.initials}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="text-xs font-medium">
                  {newUser.name} just joined!
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-sm text-neutral-600">
        Join{" "}
        <span className="font-medium text-neutral-900">
          {users.length + 490}+
        </span>{" "}
        teams already on the waitlist
      </p>
    </div>
  );
}
