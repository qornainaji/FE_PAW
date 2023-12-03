import React, { useState } from 'react';

const UserTable = ({ users, handleCheckboxChange, handleSelectChange, handleEdit, handleDelete }) => {
  const getCurrentPageData = () => {
    if (!Array.isArray(users)) {
      return [];
    }
    return users;
  };

  return (
    <div className="px-6" style={{ padding: '32px 120px' }}>
      <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-green-1-400">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-sans font-medium text-neutral-1000 uppercase tracking-wider">
              Checkbox
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium font-sans text-neutral-1000 uppercase tracking-wider">
              Nama Pengguna
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium font-sans text-neutral-1000 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium font-sans text-neutral-1000 uppercase tracking-wider">
              NIM
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium font-sans text-neutral-1000 uppercase tracking-wider">
              Tipe Akses
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium font-sans text-neutral-1000 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium font-sans text-neutral-1000 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {getCurrentPageData().map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-3 whitespace-nowrap text-left flex">
                <input
                  type="checkbox"
                  checked={user.user_isAdmin} // Menggunakan properti isAdmin untuk checkbox
                  onChange={(e) => handleCheckboxChange(user._id, e.target.checked)}
                />
              </td>
              <td className="px-6 py-3 whitespace-nowrap font-bold text-left text-xs font-sans">{user.user_name}</td>
              <td className="px-6 py-3 whitespace-nowrap text-left  text-xs font-sans">{user.user_email}</td>
              <td className="px-6 py-3 whitespace-nowrap text-left text-xs font-sans">{user.user_NIM}</td>
              <td className="px-6 py-3 whitespace-nowrap text-left text-xs font-sans">
                <select value={user.user_accessType} onChange={(e) => handleSelectChange(user._id, e.target.value)}>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-left text-xs font-sans">
                {user.user_isVerified ? "Verified" : "Not Verified"}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-left text-xs font-sans flex">
                <button onClick={() => handleEdit(user._id)} className="text-green-2-500">Edit</button>
                <span className="px-4">
                  <span className="bg-gray-200 py-3 w-px block"></span>
                </span>
                <button onClick={() => handleDelete(user._id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
