import Link from "next/link";

const Timeline = () => (
  <>
    <h1>This is the Timeline</h1>
    <Link href="/">
      <a>Go home</a>
    </Link>
    <style jsx>{`
      h1 {
        color: red;
        font-size: 36px;
      }
    `}</style>
  </>
);

export default Timeline;
