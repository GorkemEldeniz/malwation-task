type Button = {
  children: React.ReactNode | string;
  type: 'submit' | 'button';
  color: string,
  disabled: boolean,
}

function Button({ children, type, color, disabled }: Button) {
  return (
    <button disabled={disabled} type={type} style={{ background: color }}>
      {children}
    </button>
  )
}

export default Button