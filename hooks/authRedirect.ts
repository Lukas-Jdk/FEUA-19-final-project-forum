import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      router.replace("/login")
    }
  }, [])
};
export default useAuthRedirect;