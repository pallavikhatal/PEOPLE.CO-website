import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Update.css';

const Update = () => {
    const [avatar, setAvatar] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [team, setTeam] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`https://68071807e81df7060eb8cd3b.mockapi.io/emp/team-members/${id}`);
                setAvatar(res.data.avatar);
                setUsername(res.data.username);
                setName(res.data.name);
                setEmail(res.data.email);
                setRole(res.data.role);
                setStatus(res.data.status);
                setTeam(res.data.team || []);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [id]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://68071807e81df7060eb8cd3b.mockapi.io/emp/team-members/${id}`, {
                avatar, username, name, email, role, status, team
            });
            alert("Member Updated Successfully.");
            navigate('/directory');
        } catch (error) {
            console.log(error);
        }
    };

    // const removeTeam = (teamName) => {
    //     setTeam(team.filter(t => t !== teamName));
    // };

    const handleAddTeam = (e) => {
        const selectedTeam = e.target.value;
        if (selectedTeam && !team.includes(selectedTeam)) {
          setTeam(prev => [...prev, selectedTeam]);
        }
        e.target.value = ""; // Reset dropdown
      };
      
      const handleRemoveTeam = (teamToRemove) => {
        setTeam(prev => prev.filter(t => t !== teamToRemove));
      };
      

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="edit-profile-container">
            <form onSubmit={updateUser} className="edit-profile-form">
                <h2>Edit Profile</h2>

                <div className="inner-form">

                <div className="profile-photo-section">
                    {avatar ? <img src={avatar} alt="Profile" className="profile-photo" /> : <div className="placeholder-photo">No Photo</div>}
                    <div className="photo-buttons">
                        <button type="button" onClick={() => fileInputRef.current.click()}>Change Photo</button>
                        <button type="button" onClick={() => setAvatar('')}>Remove Photo</button>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handlePhotoChange}
                        />
                    </div>
                </div>

                <div className="form-grid">
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
                </div>

                {/* <div className="team-tags-section">
                    <label>Teams:</label>
                    <div className="team-tags">
                        {team.map((t) => (
                            <span key={t} className="tag">
                                {t} <button type="button" onClick={() => removeTeam(t)}>×</button>
                            </span>
                        ))}
                    </div>
                </div> */}
                <div className="team-tags-section">
                    <label>Teams:</label>

                    <div className="team-tags">
                        {team.map((t) => (
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
                            ))
                        }
                    </select>
                </div>
                </div>


                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/directory')}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
};

export default Update;







// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import './AddMember.css'; // Reuse the same CSS

// const Update = () => {
//     const [avatar, setAvatar] = useState('');
//     const [username, setUsername] = useState('');
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [role, setRole] = useState('');
//     const [status, setStatus] = useState('');
//     const [team, setTeam] = useState([]);

//     const { id } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const getUser = async () => {
//             try {
//                 const res = await axios.get(`https://68071807e81df7060eb8cd3b.mockapi.io/emp/team-members/${id}`);
//                 setAvatar(res.data.avatar);
//                 setUsername(res.data.username);
//                 setName(res.data.name);
//                 setEmail(res.data.email);
//                 setRole(res.data.role);
//                 setStatus(res.data.status);
//                 setTeam(res.data.team || []);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         getUser();
//     }, [id]);

//     const handleTeamCheckboxChange = (e) => {
//         const value = e.target.value;
//         setTeam(prev =>
//             prev.includes(value)
//                 ? prev.filter(t => t !== value)
//                 : [...prev, value]
//         );
//     };

//     const updateUser = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`https://68071807e81df7060eb8cd3b.mockapi.io/emp/team-members/${id}`, {
//                 avatar,username, name, email, role, status, team
//             });
//             alert("Member Updated Successfully.");
//             navigate('/directory');
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div className="add-member-container">
//             <form onSubmit={updateUser} className="add-member-form">
//                 <h2>UPDATE MEMBER</h2>

//                 <label>
//                     Avatar URL:
//                     <input
//                         type="text"
//                         value={avatar}
//                         onChange={(e) => setAvatar(e.target.value)}
//                         required
//                     />
//                 </label>

//                 <label>
//                     Username:
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
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

//                 <button type="submit">Update Member</button>
//             </form>
//         </div>
//     );
// };

// export default Update;
