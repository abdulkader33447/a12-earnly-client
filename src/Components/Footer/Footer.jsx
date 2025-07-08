import React from "react";
import logo from "../../assets/uh56knr8oel574nn6apb-removebg-preview.png";
import { Link } from "react-router";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="">
      <footer className="footer  lg:w-8/12 md:w-9/12 w-11/12 mx-auto sm:footer-horizontal  sm:p-10 p-2">
        <aside>
          <Link to="/">
            <img src={logo} alt="logo" className="size-15" />
          </Link>
          <p>
            EARNLY Ltd.
            <br />
            Providing microtask since 2025
          </p>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            EARNLY
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="flex gap-4 text-2xl">
            <a
              href="https://www.facebook.com/profile.php?id=100022417866700"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1ebcec]"
            >
              <FaFacebook />
            </a>

            <a
              href="https://github.com/abdulkader33447"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1ebcec]"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/abdul-kader-80a7a5350?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-[#1ebcec]"
            >
              <FaLinkedin />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
