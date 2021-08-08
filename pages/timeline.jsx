import Link from "next/link";
import AppLayout from "../components/AppLayout";

const Timeline = ({ username }) => (
  <>
    <AppLayout>
      <h1>This is the Timeline of {username}</h1>
      <Link href="/">
        <a>Go home</a>
      </Link>
      <style jsx>{`
        h1 {
          color: red;
          font-size: 36px;
        }
      `}</style>
    </AppLayout>
  </>
);

Timeline.getInitialProps = () => {
  return fetch("http://localhost:3000/api/hello")
    .then((res) => res.json())
    .then((res) => {
      const { username } = res;
      return { username };
    });
};

export default Timeline;
