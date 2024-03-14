"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  });
  return (
    <div>
      <div className="img -mt-16 h-[650px]">
        <div
          className="flex flex-col justify-center items-center h-full gap-4"
          data-aos="fade-up"
        >
          <h3 className="text-6xl font-bold">Why Nganterin?</h3>
          <h3 className="text-sm font-thin">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
            dignissimos.
          </h3>
        </div>
      </div>
      <div className="bg-orange-100 min-h-screen text-sky-900 py-40">
        <div className="w-3/4 mx-auto flex flex-col gap-40">
          <div className="w-11/12 lg:w-3/4 xl:w-1/2" data-aos="fade-right">
            <h2 className="text-2xl">Easy to use</h2>
            <h4 className="border-t border-sky-700 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              possimus maiores saepe voluptatibus sed cupiditate magni
              reprehenderit, accusantium rem tenetur, accusamus, placeat illum!
              Delectus ipsa fuga aliquid quae quidem, officia voluptas
              asperiores sed suscipit facere ab et iusto ea eius harum illum
              blanditiis quam adipisci ducimus, maxime ullam minima ipsum!
            </h4>
          </div>
          <div className="w-11/12 lg:w-3/4 xl:w-1/2 text-right" data-aos="fade-right">
            <h2 className="text-2xl">Easy to use</h2>
            <h4 className="border-t border-sky-700 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              possimus maiores saepe voluptatibus sed cupiditate magni
              reprehenderit, accusantium rem tenetur, accusamus, placeat illum!
              Delectus ipsa fuga aliquid quae quidem, officia voluptas
              asperiores sed suscipit facere ab et iusto ea eius harum illum
              blanditiis quam adipisci ducimus, maxime ullam minima ipsum!
            </h4>
          </div>
          <div className="w-11/12 lg:w-3/4 xl:w-1/2" data-aos="fade-right">
            <h2 className="text-2xl">Easy to use</h2>
            <h4 className="border-t border-sky-700 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              possimus maiores saepe voluptatibus sed cupiditate magni
              reprehenderit, accusantium rem tenetur, accusamus, placeat illum!
              Delectus ipsa fuga aliquid quae quidem, officia voluptas
              asperiores sed suscipit facere ab et iusto ea eius harum illum
              blanditiis quam adipisci ducimus, maxime ullam minima ipsum!
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
