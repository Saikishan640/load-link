import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, NotificationItem } from '../types';
import { INITIAL_USERS, INITIAL_NOTIFICATIONS } from '../lib/supabase';

interface AuthContextType {
  currentUser: User | null;
  allUsers: User[];
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  signup: (userData: { name: string; email: string; phone: string; role: UserRole; company_name?: string; gstin?: string }) => Promise<boolean>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  switchUser: (userId: string) => void;
  updateProfile: (data: Partial<User>) => void;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (title: string, message: string, type: 'booking' | 'match' | 'payout' | 'alert') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('loadlink_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedId = localStorage.getItem('loadlink_current_user_id');
    const list = localStorage.getItem('loadlink_users');
    const parsedUsers: User[] = list ? JSON.parse(list) : INITIAL_USERS;
    if (savedId) {
      const found = parsedUsers.find(u => u.id === savedId);
      if (found) return found;
    }
    // Default to Sai (customer)
    return parsedUsers[0];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('loadlink_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('loadlink_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('loadlink_current_user_id', currentUser.id);
    } else {
      localStorage.removeItem('loadlink_current_user_id');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('loadlink_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const login = async (email: string, explicitRole?: UserRole): Promise<boolean> => {
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user && explicitRole) {
      user = users.find(u => u.role === explicitRole);
    }
    if (!user) {
      // Create user on the fly if testing with custom email
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0].toUpperCase(),
        email,
        phone: '+91 99887 11223',
        role: explicitRole || 'customer',
        created_at: new Date().toISOString(),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        kyc_status: 'verified',
        rating: 5.0,
        completed_trips: 0,
        wallet_balance: 5000,
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      return true;
    }
    setCurrentUser(user);
    return true;
  };

  const signup = async (userData: {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    company_name?: string;
    gstin?: string;
  }): Promise<boolean> => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      created_at: new Date().toISOString(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      company_name: userData.company_name,
      gstin: userData.gstin,
      kyc_status: userData.role === 'driver' ? 'pending' : 'verified',
      rating: 5.0,
      completed_trips: 0,
      wallet_balance: 2000,
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    const targetUser = users.find(u => u.role === newRole) || {
      id: `user_${newRole}_${Date.now()}`,
      name: newRole === 'driver' ? 'Ramesh Trucker' : newRole === 'business' ? 'Enterprise Fleet' : 'Customer Account',
      email: `${newRole}@loadlink.app`,
      phone: '+91 98765 00000',
      role: newRole,
      created_at: new Date().toISOString(),
      kyc_status: 'verified',
      rating: 4.9,
      completed_trips: 12,
      wallet_balance: 15000,
    };
    setCurrentUser(targetUser as User);
  };

  const switchUser = (userId: string) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      setCurrentUser(target);
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (title: string, message: string, type: 'booking' | 'match' | 'payout' | 'alert') => {
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title,
      message,
      type,
      time: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        allUsers: users,
        role: currentUser?.role || 'customer',
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        switchRole,
        switchUser,
        updateProfile,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        clearAllNotifications,
        addNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
