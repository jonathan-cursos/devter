import { colors } from '../../styles/theme'

export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button onClick={onClick} disabled={disabled}>
        {children}
      </button>
      {console.log(disabled)}
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
          user-select: none;
        }

        button[disabled] {
          opacity: 0.2;
          pointer-events: none;
        }

        button > :global(svg) {
          margin-right: 8px;
        }

        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}
