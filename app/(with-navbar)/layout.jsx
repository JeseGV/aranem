import NavBar from "@/components/NavBar"

export default function WithNavBar({ children }) {
  return (
    <div className='w-full h-full flex flex-col'>
      <div className='flex-grow overflow-y-auto overflow-x-hidden'>{children}</div>
      <NavBar />
    </div>
  )
}
