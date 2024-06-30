import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Image
        className=""
        src="/image/main_logo/Infinite Loop Loading.gif"
        height={500}
        width={500}
      />
    </div>
  );
}
