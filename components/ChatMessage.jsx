const types = {
  gradient: "bg-gradient",
  glass: "bg-gradient-to-b from-[#fff1] to-[#fff3] backdrop-blur-sm",
}

export default function ChatMessage({
  children,
  type,
  rounded,
  shadow,
  className,
  contentEditable,
  id,
  ...props
}) {
  return (
    <div
      id={id}
      contentEditable={contentEditable}
      className={`border-none outline-none ${rounded && "rounded-[2rem]"} ${
        shadow && "shadow-md"
      } ${types[type]} ${className}`}>
      {children}
    </div>
  )
}
