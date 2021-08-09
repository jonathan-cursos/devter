import { fonts } from "../../styles/theme";
const AppLayout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: ${fonts.base};
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
      ;
    </>
  );
};

export default AppLayout;
