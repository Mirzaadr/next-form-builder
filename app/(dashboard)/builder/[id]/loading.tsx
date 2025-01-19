import Spinner from "@/components/common/Spinner";

const Loading = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <Spinner size="icon"/>
    </div>
  )
}

export default Loading;