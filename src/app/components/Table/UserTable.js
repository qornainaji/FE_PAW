import React, { useState } from 'react';
import axios from 'axios';

const UserTable = ({ users, checkboxChange, selectChange, edit, onDelete }) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const getCurrentPageData = () => {
    if (!Array.isArray(users)) {
      return [];
    }
    return users;
  };

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
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const [checked, setChecked] = useState(null);

  
  const handleCheckedMap = (isChecked) => {
    const checkedMap = {
      checked : true,
       "" : false
    }
    // How to make isChecked from boolean to string

    return checkedMap[String(isChecked)] || String(isChecked);
  };

  
  const handleCheckedStatus = (isChecked) => {
    // setChecked(isChecked);
    return isChecked ? "checked" : "";
  };

  const handleCheckedString = (isChecked) => {
    // handleCheckedMap(isChecked)
    setChecked(!handleCheckedMap(isChecked))
  }
  // const isCheckedMapped = handleCheckedStatus(user.user_isVerified);

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
                  checked={user.user_isVerified}
                  // checked={handleCheckedStatus(user.user_isVerified)}
                  // checked={()=>handleCheckedStatus(user.user_isVerified)}
                  // value={user.user_isVerified}
                  // onChange={(e) => toggleCheckbox(user._id, e.target.checked)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    toggleCheckbox(user._id, isChecked);
                    // Optionally update the UI immediately based on the local state
                    // const updatedUsers = getCurrentPageData().map((u) => {
                    //   if (u._id === user._id) {
                    //     return { ...u, user_isVerified: isChecked };
                    //   }
                    //   return u;
                    // });
                    // Update the UI after the checkbox state change
                    // setUsers(!isChecked); // Assuming 'setUsers' is a state updater function
                    // handleCheckedString(isChecked);
                  }}
                />
              </td>
              <td className="px-6 py-3 whitespace-nowrap font-bold text-left text-xs font-sans">
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
              <td className="px-6 py-3 whitespace-nowrap text-left  text-xs font-sans">
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
              <td className="px-6 py-3 whitespace-nowrap text-left text-xs font-sans">
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
              <td className="px-6 py-3 whitespace-nowrap text-left text-xs font-sans">
                <select value={user.user_accessType} onChange={(e) => selectChange(user._id, e.target.value)}>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-left text-xs font-sans">
                {user.user_isVerified ? "Verified" : "Not Verified"}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-left text-xs font-sans flex">
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
