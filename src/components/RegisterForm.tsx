import React from "react";

interface RegisterFormProps {
    formData: {
        userName: string;
        userTelephone: string;
        userEmail: string;
        userPassword: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    error: string | null;
    success: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ formData, onChange, onSubmit, error, success }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="userName">Name</label>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="userTelephone">Telephone</label>
                <input
                    type="text"
                    id="userTelephone"
                    name="userTelephone"
                    value={formData.userTelephone}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="userEmail">Email</label>
                <input
                    type="email"
                    id="userEmail"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="userPassword">Password</label>
                <input
                    type="password"
                    id="userPassword"
                    name="userPassword"
                    value={formData.userPassword}
                    onChange={onChange}
                    required
                />
            </div>
            <button type="submit">Register</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>Registration successful! Redirecting...</p>}
        </form>
    );
};

export default RegisterForm;
