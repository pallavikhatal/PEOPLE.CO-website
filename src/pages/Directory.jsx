// import axios from 'axios';
// import { FiSearch, FiFilter } from 'react-icons/fi';
// import React, { useEffect, useState } from 'react';
// import './Directory.css';
// import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
// import Dot from '../assets/img/Dot.png';
// import AddMember from '../components/AddMember';
// import Update from '../components/Update';

// const Directory = () => {
//   const [user, setUser] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editUserId, setEditUserId] = useState(null);

//   const getUser = async () => {
//     try {
//       const res = await axios.get("https://68071807e81df7060eb8cd3b.mockapi.io/emp/team-members");
//       setUser(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   const remove = async (id) => {
//     await axios.delete(`https://68071807e81df7060eb8cd3b.mockapi.io/emp/team-members/${id}`);
//     getUser();
//     alert("Member Deleted...");
//   };

//   const filteredUsers = user.filter(u =>
//     u.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       <div className="page-content">
//         <section className="team-header">
//           <div className="team-header-left">
//             <h2>Team members</h2>
//             <span className="user-count">{filteredUsers.length} users</span>
//           </div>

//           <div className="team-header-right">
//             <div className="search-box">
//               <input
//                 type="text"
//                 placeholder="Search by name"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <FiSearch color='#7f56d9' />
//             </div>
//             <button className="filter-btn">
//               <FiFilter size={20} />
//             </button>
//             <button onClick={() => setShowAddModal(true)} className="add-btn">+ ADD MEMBER</button>
//           </div>
//         </section>

//         <section className='team-table'>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Status</th>
//                 <th>Role</th>
//                 <th>Email Address</th>
//                 <th>Teams</th>
//                 <th colSpan={2}></th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredUsers.map((u) => (
//                 <tr key={u.id}>
//                   <td className='name-cell' onClick={() => setSelectedUser(u)} style={{ cursor: 'pointer' }}>
//                     <img src={u.avatar} alt={u.name} />
//                     <div className="cell-data">
//                       <p className='u-name'>{u.name}</p>
//                       <p className='u-username'>{u.username}</p>
//                     </div>
//                   </td>
//                   <td>
//                     <span className="status-badge">
//                       <img src={Dot} alt="status" />
//                       {u.status}
//                     </span>
//                   </td>
//                   <td style={{ color: '#6b7280', fontSize: '14px' }}>{u.role}</td>
//                   <td style={{ color: '#6b7280', fontSize: '14px' }}>{u.email}</td>
//                   <td style={{ color: '#6b7280', fontSize: '14px' }}>
//                     {u.team?.map((team, index) => (
//                       <span className="tag" key={index}>{team}</span>
//                     ))}
//                   </td>
//                   <td onClick={() => remove(u.id)}><MdDeleteOutline className="action-icon delete" /></td>
//                   <td onClick={() => setEditUserId(u.id)}><MdOutlineEdit className="action-icon edit" /></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>

//         {/* Details Card Modal */}
//         {selectedUser && (
//           <div className="details-card-overlay">
//             <div className="details-card">
//               <button className="close-btn" onClick={() => setSelectedUser(null)}>✕</button>
//               <img src={selectedUser.avatar} alt={selectedUser.name} className="details-avatar" />
//               <h2>{selectedUser.name}</h2>
//               <p><strong>Email:</strong> {selectedUser.email}</p>
//               <p><strong>Role:</strong> {selectedUser.role}</p>
//               <p><strong>Status:</strong> {selectedUser.status}</p>
//               <p><strong>Teams:</strong> {selectedUser.team?.join(', ') || 'No Team'}</p>
//             </div>
//           </div>
//         )}

//         {/* Add Member Modal */}
//         {showAddModal && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <button className="close-btn" onClick={() => setShowAddModal(false)}>✕</button>
//               <AddMember onClose={() => {
//                 setShowAddModal(false);
//                 getUser();
//               }} />
//             </div>
//           </div>
//         )}

//         {/* Update Member Modal */}
//         {editUserId && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <button className="close-btn" onClick={() => setEditUserId(null)}>✕</button>
//               <Update id={editUserId} onClose={() => {
//                 setEditUserId(null);
//                 getUser();
//               }} />
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Directory;








import axios from 'axios';
import { FiSearch, FiFilter } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Directory.css';
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import Dot from '../assets/img/Dot.png';

const Directory = () => {
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const [showFilters, setShowFilters] = useState(false);
  const [showRoleOptions, setShowRoleOptions] = useState(false);
  const [showTeamOptions, setShowTeamOptions] = useState(false);

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  const availableRoles = ['Product Designer', 'Product Manager', 'Frontend Developer', 'Backend Developer'];
  const availableTeams = ['Design', 'Product', 'Marketing', 'Technology'];

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get("https://68071807e81df7060eb8cd3b.mockapi.io/emp/team-members");
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const remove = async (id) => {
    await axios.delete(`https://68071807e81df7060eb8cd3b.mockapi.io/emp/team-members/${id}`);
    getUser();
    alert("Member Deleted...");
  };

  // const filteredUsers = user.filter(u =>
  //   u.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredUsers = user.filter(u => {
    const nameMatch = u.name.toLowerCase().includes(searchTerm.toLowerCase());

    const roleMatch = selectedRoles.length === 0 || selectedRoles.includes(u.role);

    const teamMatch =
      selectedTeams.length === 0 ||
      (u.team && u.team.some(team => selectedTeams.includes(team)));

    return nameMatch && roleMatch && teamMatch;
  });


  return (
    <>
      <div className="page-content">
        <section className="team-header">
          <div className="team-header-left">
            <h2>Team members</h2>
            <span className="user-count">{filteredUsers.length} users</span>
          </div>

          <div className="team-header-right">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id='search-bar'
              />
              <FiSearch color='#7f56d9' />
            </div>

            <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
              <FiFilter size={20} />
            </button>

            <button onClick={() => { navigate('/addmember') }} className="add-btn">+ ADD MEMBER</button>
          </div>
        </section>

        {showFilters && (
          <div className="filter-dropdown">
            <h4>Filters</h4>

            <div className="filter-group">
              <input
                type="checkbox"
                checked={showRoleOptions}
                onChange={() => setShowRoleOptions(!showRoleOptions)}
                id="roles"
              />
              <label htmlFor="roles" onClick={() => setShowRoleOptions(!showRoleOptions)}>Roles</label>
              {showRoleOptions && (
                <div className="sub-options">
                  {availableRoles.map(role => (
                    <div className='sub-options-flex' key={role}>
                      <input
                        type="checkbox"
                        checked={selectedRoles.includes(role)}
                        onChange={() =>
                          setSelectedRoles(prev =>
                            prev.includes(role)
                              ? prev.filter(r => r !== role)
                              : [...prev, role]
                          )
                        }
                        id={role}
                      />
                      <label htmlFor={role}>{role}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-group">
              <input
                type="checkbox"
                checked={showTeamOptions}
                onChange={() => setShowTeamOptions(!showTeamOptions)}
                id="teams"
              />
              <label htmlFor="teams" onClick={() => setShowTeamOptions(!showTeamOptions)}>Teams</label>
              {showTeamOptions && (
                <div className="sub-options">
                  {availableTeams.map(team => (
                    <div key={team}>
                      <input
                        type="checkbox"
                        checked={selectedTeams.includes(team)}
                        onChange={() =>
                          setSelectedTeams(prev =>
                            prev.includes(team)
                              ? prev.filter(t => t !== team)
                              : [...prev, team]
                          )
                        }
                        id={team}
                      />
                      <label htmlFor={team}>{team}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              className="select-btn"
              onClick={() => setShowFilters(false)}
            >
              SELECT
            </button>
          </div>
        )}


        <section className='team-table'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Role</th>
                <th>Email Address</th>
                <th>Teams</th>
                <th colSpan={2}></th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td className='name-cell' onClick={() => setSelectedUser(u)} style={{ cursor: 'pointer' }}>
                    <img src={u.avatar} alt={u.name} />
                    <div className="cell-data">
                      <p className='u-name'>{u.name}</p>
                      <p className='u-username'>{u.username}</p>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge">
                      <img src={Dot} alt="status" />
                      {u.status}
                    </span>
                  </td>
                  <td style={{ color: '#6b7280', fontSize: '14px' }}>{u.role}</td>
                  <td style={{ color: '#6b7280', fontSize: '14px' }}>{u.email}</td>
                  <td style={{ color: '#6b7280', fontSize: '14px' }}>
                    {u.team?.map((team, index) => (
                      <span className="tag" key={index}>{team}</span>
                    ))}
                  </td>
                  <td onClick={() => remove(u.id)}><MdDeleteOutline className="action-icon delete" /></td>
                  <td onClick={() => navigate(`/update/${u.id}`)}><MdOutlineEdit className="action-icon edit" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {selectedUser && (
          <div className="details-card-overlay">
            <div className="details-card">
              <button className="close-btn" onClick={() => setSelectedUser(null)}>✕</button>
              <img src={selectedUser.avatar} alt={selectedUser.name} className="details-avatar" />
              <h2>{selectedUser.name}</h2>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Status:</strong> {selectedUser.status}</p>
              <p><strong>Teams:</strong> {selectedUser.team?.join(', ') || 'No Team'}</p>
            </div>
          </div>
        )}

        {showFilters && (
          <div className="filter-dropdown">
            <h4>Filters</h4>

            <div className="filter-group">
              <input
                type="checkbox"
                checked={showRoleOptions}
                onChange={() => setShowRoleOptions(!showRoleOptions)}
                id="roles"
              />
              <label htmlFor="roles" onClick={() => setShowRoleOptions(!showRoleOptions)}>Roles</label>
              {showRoleOptions && (
                <div className="sub-options">
                  {availableRoles.map(role => (
                    <div key={role}>
                      <input
                        type="checkbox"
                        checked={selectedRoles.includes(role)}
                        onChange={() =>
                          setSelectedRoles(prev =>
                            prev.includes(role)
                              ? prev.filter(r => r !== role)
                              : [...prev, role]
                          )
                        }
                        id={role}
                      />
                      <label htmlFor={role}>{role}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-group">
              <input
                type="checkbox"
                checked={showTeamOptions}
                onChange={() => setShowTeamOptions(!showTeamOptions)}
                id="teams"
              />
              <label htmlFor="teams" onClick={() => setShowTeamOptions(!showTeamOptions)}>Teams</label>
              {showTeamOptions && (
                <div className="sub-options">
                  {availableTeams.map(team => (
                    <div key={team}>
                      <input
                        type="checkbox"
                        checked={selectedTeams.includes(team)}
                        onChange={() =>
                          setSelectedTeams(prev =>
                            prev.includes(team)
                              ? prev.filter(t => t !== team)
                              : [...prev, team]
                          )
                        }
                        id={team}
                      />
                      <label htmlFor={team}>{team}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowFilters(false)}
            >
              SELECT
            </button>
          </div>
        )}

      </div>
    </>
  );
};

export default Directory;