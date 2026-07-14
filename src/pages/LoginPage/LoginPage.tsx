import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import InputLabel from '../../components/Atoms/InputLabel/InputLabel';
import PrimaryButton from '../../components/Atoms/PrimaryButton/PrimaryButton';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        navigate('/');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.' + err);
    }
  };

  return (
    <div className='w-[50vw] justify-center m-auto flex flex-col text-white py-10'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 p-4 bg-dark-gray rounded-xl'>
        <img src="/Bureau.png" alt="Bureau logo" className="w-[20vw] m-auto" />
        <InputLabel htmlFor="username" label="Username" />
        <input
          className='grow px-4 py-2 bg-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm'
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <InputLabel htmlFor="password" label="Password" />
        <input
          id="password"
          className='grow px-4 py-2 bg-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className='flex justify-center py-4'>
            <PrimaryButton text="Login" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;