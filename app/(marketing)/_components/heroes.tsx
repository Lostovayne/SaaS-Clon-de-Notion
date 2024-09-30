import Image from "next/image";

const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center mx-auto justify-evenly">
        <div className="relative size-[300px] sm:size-[350px] md:size-[380px] lg:size-[400px] xl:size-[450px] 2xl:size-[500px]">
          <Image
            src="/documents.png"
            fill
            className="object-contain dark:hidden"
            alt="Documents"
            sizes="(max-width: 768px) 100vw , (max-width: 1280px) 80vw , 120vw"
            priority
          />
          <Image
            src="/documents-dark.png"
            fill
            className="object-contain hidden dark:block"
            alt="Documents"
            sizes="(max-width: 768px) 100vw , (max-width: 1280px) 80vw , 120vw"
            priority
          />
        </div>
        <div className="relative sm:size-[350px] md:size-[380px] lg:size-[400px] xl:size-[450px] 2xl:size-[500px] hidden md:block">
          <Image
            src="/reading.png"
            fill
            className="object-contain dark:hidden"
            alt="Reading"
            sizes="(max-width: 768px) 100vw , (max-width: 1280px) 80vw , 120vw"
            priority
          />
          <Image
            src="/reading-dark.png"
            fill
            className="object-contain hidden dark:block"
            alt="Reading"
            sizes="(max-width: 768px) 100vw , (max-width: 1280px) 80vw , 120vw"
            priority
          />
        </div>
      </div>
    </div>
  );
};
export default Heroes;
