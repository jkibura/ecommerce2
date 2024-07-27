
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageUsers.css';

const ManageUsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/users');
        setUsers(response.data.users);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateUser = async (userId: string, updatedRole: string) => {
    try {
      await axios.patch(`http://localhost:2000/api/users/${userId}`, { role: updatedRole });
      setUsers(prevUsers => prevUsers.map(user =>
        user._id === userId ? { ...user, role: updatedRole } : user
      ));
    } catch (err) {
      console.error('Failed to update user');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:2000/api/users/${userId}`);
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
    } catch (err) {
      console.error('Failed to delete user');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="manage-users-page">
      <h1>Manage Users</h1>
      {users.length === 0 && <p>No users found.</p>}
      {users.map(user => (
        <div key={user._id} className="user-item">
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Number of Orders: {user.orders.length}</p>
          <button onClick={() => handleUpdateUser(user._id, 'admin')}>Make Admin</button>
          <button onClick={() => handleUpdateUser(user._id, 'user')}>Revert to User</button>
          <button onClick={() => handleDeleteUser(user._id)}>Delete User</button>
        </div>
      ))}
    </div>
  );
};

export default ManageUsersPage;
