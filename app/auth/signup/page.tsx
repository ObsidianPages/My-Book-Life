import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        // Add user signup logic here (API call)
        console.log('Signing up with', { email, password });
        // Simulate signup success and redirect
        router.push('/welcome');
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Email:</label>
                    <input 
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;