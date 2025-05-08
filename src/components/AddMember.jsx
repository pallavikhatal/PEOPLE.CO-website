import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMember.css'; 
// import TeamCell from './TeamCell';

const AddMember = () => {
    const [avatar, setAvatar] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [team, setTeam] = useState([]);

    const navigate = useNavigate();

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
        }
    };

    const handleAddTeam = (e) => {
        const selectedTeam = e.target.value;
        if (selectedTeam && !team.includes(selectedTeam)) {
            setTeam(prev => [...prev, selectedTeam]);
        }
        e.target.value = "";
    };

    const handleRemoveTeam = (teamToRemove) => {
        setTeam(prev => prev.filter(t => t !== teamToRemove));
    };

    const handleRemoveAvatar = () => {
        setAvatar('');
    };

    const sendUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://68071807e81df7060eb8cd3b.mockapi.io/emp/team-members", {
                avatar, username, name, email, role, status, team
            });
            alert("Member Added Successfully.");
            navigate('/directory');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="update-member-container">
            <form onSubmit={sendUser} className="update-member-form">
                <h2>ADD MEMBER</h2>

                {/* Avatar Section */}
                <div className="avatar-section">
                    {avatar ? (
                        <>
                            <img src={avatar} alt="Avatar Preview" className="avatar-preview" />
                            <div className="avatar-buttons">
                                <label className="avatar-upload-btn">
                                    Change Photo
                                    <input type="file" accept="image/*" onChange={handleAvatarUpload} hidden />
                                </label>
                                <button type="button" className="avatar-remove-btn" onClick={handleRemoveAvatar}>
                                    Remove Photo
                                </button>
                            </div>
                        </>
                    ) : (
                        <label className="avatar-upload-btn">
                            Upload Photo
                            <input type="file" accept="image/*" onChange={handleAvatarUpload} hidden />
                        </label>
                    )}
                </div>

                {/* Form Inputs */}
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="@john"
                        required
                    />
                </label>

                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                    />
                </label>

                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@gmail.com"
                        required
                    />
                </label>

                <label>
                    Role:
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="">Select Role</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Java Fullstack Developer">Java Fullstack Developer</option>
                        <option value="React Developer">React Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Python Developer">Python Developer</option>
                    </select>
                </label>

                <label>
                    Status:
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </label>

                {/* Teams */}
                <div className="team-tags-section">
                    <label>Teams:</label>
                    <div className="team-tags">
                        {team.map(t => (
                            <span className="tag" key={t}>
                                {t}
                                <button type="button" onClick={() => handleRemoveTeam(t)}>×</button>
                            </span>
                        ))}
                    </div>
                    <select onChange={handleAddTeam} defaultValue="" className='select-team'>
                        <option value="" disabled>Select team to add</option>
                        {["Design", "Marketing", "Product", "Engineering", "Tech", "Sales", "Data"]
                            .filter(t => !team.includes(t))
                            .map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                    </select>
                </div> 

{/* <label>
    Teams:
    <div className="checkbox-group">
        {["Design", "Marketing", "Product", "Engineering", "Tech", "Sales", "Data"].map(teamName => (
            <label key={teamName} className="checkbox-item">
                <input
                    type="checkbox"
                    value={teamName}
                    checked={team.includes(teamName)}
                    onChange={handleTeamCheckboxChange}
                />
                {teamName}
            </label>
        ))}
    </div>

    
    {team.length > 0 && (
        <div style={{ marginTop: '10px' }}>
            <TeamCell teams={team} />
        </div>
    )}
</label> */}


                {/* <button type="submit">Add Member</button> */}

                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/directory')}>Cancel</button>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddMember;








// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AddMember.css';

// const AddMember = () => {
//     const [avatar, setAvatar] = useState('');
//     const [username, setUsername] = useState('');
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [role, setRole] = useState('');
//     const [status, setStatus] = useState('');
//     const [team, setTeam] = useState([]);

//     const navigate = useNavigate();

//     const handleTeamCheckboxChange = (e) => {
//         const value = e.target.value;
//         setTeam(prev =>
//             prev.includes(value)
//                 ? prev.filter(t => t !== value)
//                 : [...prev, value]
//         );
//     };

//     const sendUser = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post("https://68071807e81df7060eb8cd3b.mockapi.io/emp/team-members", {
//                 avatar,username, name, email, role, status, team
//             });
//             alert("Member Added Successfully...");
//             navigate('/directory');
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <div className="add-member-container">
//             <form onSubmit={sendUser} className='add-member-form'>
//                 <h2>ADD MEMBER</h2>

//                 <label>
//                     Avatar URL:
//                     <input
//                         type="text"
//                         value={avatar}
//                         onChange={(e) => setAvatar(e.target.value)}
//                         placeholder="https://example.com/avatar.jpg"
//                         required
//                     />
//                 </label>

//                 <label>
//                     Username:
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         placeholder="@john"
//                         required
//                     />
//                 </label>

//                 <label>
//                     Name:
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="John Doe"
//                         required
//                     />
//                 </label>

//                 <label>
//                     Email:
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="john@gmail.com"
//                         required
//                     />
//                 </label>

//                 <label>
//                     Role:
//                     <select value={role} onChange={(e) => setRole(e.target.value)} required>
//                         <option value="">Select Role</option>
//                         <option value="Frontend Developer">Frontend Developer</option>
//                         <option value="Java Fullstack Developer">Java Fullstack Developer</option>
//                         <option value="React Developer">React Developer</option>
//                         <option value="Backend Developer">Backend Developer</option>
//                         <option value="Python Developer">Python Developer</option>
//                     </select>
//                 </label>

//                 <label>
//                     Status:
//                     <select value={status} onChange={(e) => setStatus(e.target.value)} required>
//                         <option value="">Select Status</option>
//                         <option value="Active">Active</option>
//                         <option value="Inactive">Inactive</option>
//                     </select>
//                 </label>

//                 <label>
//                     Teams:
//                     <div className="checkbox-group">
//                         {["Design", "Marketing", "Product", "Engineering", "Tech", "Sales", "Data"].map(teamName => (
//                             <label key={teamName} className="checkbox-item">
//                                 <input
//                                     type="checkbox"
//                                     value={teamName}
//                                     checked={team.includes(teamName)}
//                                     onChange={handleTeamCheckboxChange}
//                                 />
//                                 {teamName}
//                             </label>
//                         ))}
//                     </div>
//                 </label>

//                 <button type="submit">Add Member</button>
//             </form>
//         </div>
//     );
// }

// export default AddMember;




// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AddMember.css'

// const AddMember = () => {
//     const [avatar, setAvatar] = useState('');
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [role, setRole] = useState('');
//     const [status, setStatus] = useState('');
//     const [team, setTeam] = useState([]);

//     const navigate = useNavigate();

//     const handleTeamChange = (e) => {
//         const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
//         setTeam(selectedOptions);
//     };

//     const sendUser = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post("https://68071807e81df7060eb8cd3b.mockapi.io/emp/team-members", {
//                 avatar, name, email, role, status, team
//             });
//             alert("Member Added Successfully...");
//             navigate('/directory');
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <>
//         <div className="add-member-container">
        
//             <form onSubmit={sendUser} className='add-member-form' style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
//             <p>ADD MEMBER</p>
//                 <label>
//                     Avatar URL:
//                     <input 
//                         type="text" 
//                         value={avatar} 
//                         onChange={(e) => setAvatar(e.target.value)} 
//                         placeholder="https://example.com/avatar.jpg"
//                         required 
//                     />
//                 </label>

//                 <label>
//                     Name:
//                     <input 
//                         type="text" 
//                         value={name} 
//                         onChange={(e) => setName(e.target.value)} 
//                         required 
//                     />
//                 </label>

//                 <label>
//                     Email:
//                     <input 
//                         type="email" 
//                         value={email} 
//                         onChange={(e) => setEmail(e.target.value)} 
//                         required 
//                     />
//                 </label>

//                 <label>
//                     Role:
//                     <select value={role} onChange={(e) => setRole(e.target.value)} required>
//                         <option value="">Select Role</option>
//                         <option value="Frontend Developer">Frontend Developer</option>
//                         <option value="Java Fullstack Developer">Java Fullstack Developer</option>
//                         <option value="React Developer">React Developer</option>
//                         <option value="Backend Developer">Backend Developer</option>
//                         <option value="Python Developer">Python Developer</option>
//                     </select>
//                 </label>

//                 <label>
//                     Status:
//                     <select value={status} onChange={(e) => setStatus(e.target.value)} required>
//                         <option value="">Select Status</option>
//                         <option value="Active">Active</option>
//                         <option value="Inactive">Inactive</option>
//                     </select>
//                 </label>

//                 <label>
//                     Teams (Hold Ctrl/Cmd to select multiple):
//                     <select multiple value={team} onChange={handleTeamChange} required>
//                         <option value="Design">Design</option>
//                         <option value="Marketing">Marketing</option>
//                         <option value="Product">Product</option>
//                         <option value="Engineering">Engineering</option>
//                         <option value="Tech">Tech</option>
//                         <option value="Sales">Sales</option>
//                         <option value="Data">Data</option>
//                     </select>
//                 </label>

//                 <button type="submit">Add Member</button>
//             </form>
//             </div>
//         </>
//     );
// }

// export default AddMember;