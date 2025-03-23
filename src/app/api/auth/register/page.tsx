"use client"
// In your parent component (e.g., RegisterPage.tsx)
import React, { useState } from 'react';
import RegisterForm from '@/components/RegisterForm';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        userName: '',
        userTelephone: '',
        userEmail: '',
        userPassword: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Map the form data to match your backend schema
            const userData = {
                name: formData.userName,        // Changed from userName to name
                tel: formData.userTelephone,    // Changed from userTelephone to tel
                email: formData.userEmail,      // Changed from userEmail to email
                password: formData.userPassword  // Changed from userPassword to password
            };

            const response = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            setSuccess(true);
            setError(null);
            // Handle successful registration (e.g., redirect, show message)

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
            setSuccess(false);
        }
    };

    return (
        <RegisterForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            error={error}
            success={success}
        />
    );
};

export default RegisterPage;
