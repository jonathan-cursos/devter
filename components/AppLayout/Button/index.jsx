import { colors } from "../../../styles/theme";

export default function Button({ children, onClick }) {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          display: flex;
          align-items: center;
          background-color: ${colors.black};
          border: 0;
          color: ${colors.white};
          font-size: 16px;
          font-weight: 800;
          padding: 8px 24px;
          border-radius: 9999px;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  );
}
