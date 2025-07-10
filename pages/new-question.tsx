import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import QuestionForm from "@/components/QuestionForm/QuestionForm";

const NewQuestionPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <Layout>
      <div style={{ padding: "2rem" }}>
        <QuestionForm />
      </div>
    </Layout>
  );
};

export default NewQuestionPage;
