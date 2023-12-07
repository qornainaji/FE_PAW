import React, { useState, useEffect } from 'react';
import { IoCaretDownOutline, IoCaretUpOutline } from 'react-icons/io5';

const UserTable = ({
  users,
  checkboxChange,
  selectChange,
  edit,
  onDelete,
  fetchData
}) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const getCurrentPageData = () => {
    if (!Array.isArray(users)) {
      return [];
    }
    return users;
  };

  const selectStatus = async (userId, isAdmin) => {
    console.log(userId, isAdmin)
    try{
      await selectChange(userId, isAdmin);
    } catch (error){
      console.error('Error updating user:', error);
    }
  }

  const toggleCheckbox = async (userId, isChecked) => {
    console.log(userId, isChecked)
    try {
      await checkboxChange(userId, isChecked);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleEditUser = async (userId, updatedData) => {
    try {
      await edit(userId, updatedData);
      setEditingUserId(null);
      setEditedData({});

      console.log('Data edited successfully, calling fetchData...');
      fetchData(); // Memuat ulang data terbaru dari server
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    // Set default sorting saat komponen pertama kali dirender
    setSortConfig({ key: 'user_username', direction: 'ascending' });
  }, []);

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...getCurrentPageData()].sort((a, b) => {
    if (!a[sortConfig.key] || !b[sortConfig.key]) {
      return 0;
    }
  
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key].toLowerCase() > b[sortConfig.key].toLowerCase() ? 1 : -1;
    } else {
      return a[sortConfig.key].toLowerCase() < b[sortConfig.key].toLowerCase() ? 1 : -1;
    }
  });

  const getSortIcon = (key) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <IoCaretUpOutline /> : <IoCaretDownOutline />;
    }
    // Return null jika bukan kolom yang diurutkan saat ini
    return null;
  };

  return (
    <div className="px-8 "  style={{ tableLayout: 'auto'}}> 
    <table className="min-w-full divide-y neutral-default rounded-lg overflow-hidden shadow-[0_12px_20px_rgba(220,155,107,0.5)]">
        <thead className="bg-green-1-400">
          <tr>
          <th scope="col" className="px-6 py-4 text-left text-xs font-sans font-medium text-neutral-1000 uppercase tracking-wider" style={{ width: '12.5%' }}>
              Verification
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-sans font-medium text-neutral-1000 uppercase tracking-wider flex items-center"
              style={{ width: '12.5%', verticalAlign: 'middle' }}
              onClick={() => sortData('user_username')}
            >
              <span>Username</span>
              <span className="py-4">{getSortIcon('user_username')}</span>
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-sans font-medium text-neutral-1000 uppercase tracking-wider" style={{ width: '12.5%' }}>
              Full name
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-sans font-medium text-neutral-1000 uppercase tracking-wider" style={{ width: '12.5%' }}>
              Email
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-sans font-medium text-neutral-1000 uppercase tracking-wider" style={{ width: '12.5%' }}>
              NIM
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-sans font-medium text-neutral-1000 uppercase tracking-wider" style={{ width: '12.5%' }}>
              Access Type
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-sans font-medium text-neutral-1000 uppercase tracking-wider" style={{ width: '12.5%' }}>
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-sans font-medium text-neutral-1000 uppercase tracking-wider" style={{ width: '12.5%' }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedUsers.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-3 whitespace-nowrap text-left flex">
                <input
                  type="checkbox"
                  checked={user.user_isVerified}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    toggleCheckbox(user._id, isChecked);
                  }}
                />
              </td>
              <td className="px-6 py-3 whitespace-nowrap font-bold text-left text-xs font-sans" style={{ width: '12.5%', wordBreak: 'break-all' }}>
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    value={editedData.user_username || user.user_username}
                    onChange={(e) => setEditedData({ ...editedData, user_username: e.target.value })}
                    placeholder="Username"
                  />
                ) : (
                  user.user_username
                )}
              </td>
              <td className="px-6 py-3 whitespace-nowrap font-bold text-left text-xs font-sans" style={{ width: '12.5%', wordBreak: 'break-all' }}>
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    value={editedData.user_name || user.user_name}
                    onChange={(e) => setEditedData({ ...editedData, user_name: e.target.value })}
                    placeholder="Name"
                  />
                ) : (
                  user.user_name
                )}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-left  text-xs font-sans" style={{ width: '12.5%', wordBreak: 'break-all' }}>
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    value={editedData.user_email || user.user_email}
                    onChange={(e) => setEditedData({ ...editedData, user_email: e.target.value })}
                    placeholder="Email"
                  />
                ) : (
                  user.user_email
                )}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-left text-xs font-sans" style={{ width: '12.5%', wordBreak: 'break-all' }}>
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    value={editedData.user_NIM || user.user_NIM}
                    onChange={(e) => setEditedData({ ...editedData, user_NIM: e.target.value })}
                    placeholder="NIM"
                  />
                ) : (
                  user.user_NIM
                )}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-left text-xs font-sans" style={{ width: '12.5%', wordBreak: 'break-all' }}>
              <select
                value={user.user_isAdmin } //? 'Admin' : 'User'
                onChange={(e) => {
                  const isAdmin = e.target.value; //=== 'Admin';
                  selectStatus(user._id, isAdmin);
                }}
              >
                <option value={true}>Admin</option>
                <option value={false}>User</option>
              </select>
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-left text-xs font-sans" style={{ width: '12.5%', wordBreak: 'break-all' }}>
                {user.user_isVerified ? "Verified" : "Not Verified"}
              </td>
                  <td className="px-6 py-3 whitespace-nowrap text-left text-xs font-sans flex" style={{ width: '12.5%', wordBreak: 'break-all' }}>
                  {editingUserId === user._id ? (
                  <button onClick={() => handleEditUser(user._id, editedData)} className="text-green-2-500">
                    Save
                  </button>
                ) : (
                  <button onClick={() => setEditingUserId(user._id)} className="text-green-2-500">
                    Edit
                  </button>
                )}
                <span className="px-4">
                  <span className="bg-gray-200 py-3 w-px block"></span>
                </span>
                <button onClick={() => onDelete(user._id)} className="text-red-500">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
