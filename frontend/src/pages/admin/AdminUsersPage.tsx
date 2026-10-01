import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { AdminUserItem } from '../../types/admin';
import { Search } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await adminService.getUsers();
        if (res.success && res.data) {
          setUsers(res.data);
        }
      } catch (err) {
        console.error('Failed to load users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId: string) => {
    try {
      const res = await adminService.toggleUserStatus(userId);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u))
        );
      }
    } catch (err) {
      console.error('Status toggle failed:', err);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans text-foreground">
      
      {/* Header */}
      <div className="pb-4 border-b border-border space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          User Management
        </h1>
        <p className="text-xs text-text-secondary">
          Registered accounts, roles, and scan activity.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name or email..."
          className="w-full pl-8 pr-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg bg-surface border border-border overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-xs text-text-muted font-mono">
            Loading user directory...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-text-muted">
            No users match search.
          </div>
        ) : (
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-surface-subtle border-b border-border font-mono text-[11px] text-text-muted uppercase">
              <tr>
                <th className="px-4 py-2.5">User Details</th>
                <th className="px-3 py-2.5">Role</th>
                <th className="px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5">Scans Run</th>
                <th className="px-3 py-2.5">Joined</th>
                <th className="px-4 py-2.5 text-right">Access Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-surface-hover/50 transition-colors">
                  <td className="px-4 py-3 font-sans">
                    <div className="font-semibold text-foreground">{u.name}</div>
                    <div className="text-[11px] font-mono text-text-muted">{u.email}</div>
                  </td>

                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-[11px] font-mono text-foreground font-semibold">
                      {u.role}
                    </span>
                  </td>

                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className={`text-[11px] font-mono font-medium ${u.isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                      {u.isActive ? 'Active' : 'Suspended'}
                    </span>
                  </td>

                  <td className="px-3 py-3 text-foreground whitespace-nowrap">
                    {u.scanCount || 0}
                  </td>

                  <td className="px-3 py-3 text-text-muted text-[11px] whitespace-nowrap">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-right whitespace-nowrap font-sans">
                    <button
                      onClick={() => handleToggleStatus(u.id)}
                      className="px-2.5 py-1 rounded border border-border hover:bg-surface-hover text-xs font-medium text-foreground transition"
                    >
                      {u.isActive ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};
