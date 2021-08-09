import { fonts, colors } from "../../styles/theme";
import { addOpacityColor } from "../../styles/utils";

const backgroundColor = addOpacityColor(colors.primary, 0.3);
console.log(backgroundColor);
const AppLayout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <style jsx global>{`
        html,
        body {
          background-image: radial-gradient(
              ${backgroundColor} 1px,
              transparent 1px
            ),
            radial-gradient(${backgroundColor} 1px, transparent 1px);
          background-position: 0 0 25px 25px;
          background-size: 50px 50px;
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
