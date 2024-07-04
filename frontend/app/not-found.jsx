import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col items-center space-y-5">
          <div>
            <Image
              src="/image/main_logo/not_found.png"
              width={500}
              height={500}
            />
          </div>
          <h1 className="text-2xl font-bold">404 - SITE NOT FOUND</h1>
          <p className="text-sm">
            Well, this is awkward. The site you're looking for is not here.
          </p>
          <p className="text-sm">
            Is this your site?{" "}
            <Link className="text-sky-700 font-semibold" href="/">
              Home Page
            </Link>{" "}
            Or{" "}
            <Link className="text-sky-700 font-semibold" href="/">
              Contact Support{" "}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
