import styles from "./RegisterForm.module.css";
import axios from "@/axios/axios";
import { useState } from "react";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/users/register", {
        name,
        email,
        password,
      });
      setError("");
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.registerForm}>
      
      <h1>User Register</h1>

      <div className={styles.inputGroup}>
        <label>Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <button type="submit">REGISTER</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default RegisterForm;
