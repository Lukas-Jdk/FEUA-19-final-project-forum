import Layout from "@/components/Layout/Layout";
import QuestionForm from "@/components/QuestionForm/QuestionForm";
import authRedirect from "@/hooks/authRedirect";

const NewQuestionPage = () => {
  authRedirect();

  return (
    <Layout>
      <div style={{ padding: "2rem" }}>
        <QuestionForm />
      </div>
    </Layout>
  );
};

export default NewQuestionPage;
