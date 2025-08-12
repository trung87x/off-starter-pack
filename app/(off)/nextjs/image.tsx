import Image from "next/image";

function Example() {
  return (
    <>
      <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="showing desktop version of the website"
      />
      <Image
        src="/hero-mobile.png"
        width={375}
        height={667}
        className="block md:hidden"
        alt="showing mobile version of the website"
      />
    </>
  );
}

export default Example;
