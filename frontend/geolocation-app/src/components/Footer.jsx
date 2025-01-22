import React from "react";

const Footer = () => {
  return (
    <footer class="bg-zinc-900">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="md:flex items-center justify-between">
          <span class="self-center text-2xl font-semibold whitespace-nowrap">
            Geolocation App
          </span>

          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-slate-300 sm:mb-0 ">
            <li>
              <p className="mt-4 md:mt-0 md:text-right">Contact:</p>
              <p>antem5297@gmail.com</p>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span class="block text-sm text-slate-300 text-center">
          © 2025{" "}
          <a href="https://github.com/antemiljak/" class="hover:underline">
            Ante Miljak
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
