import React from "react";
import Navbar2Component from "@/app/components/(User)/Navbar2";
import FooterComponent from "@/app/components/(User)/Footer";
import DirectWaComponent from "@/app/components/(User)/DirectWa";

const UserTemplate2 = ({ children }) => {
  return (
    <>
      <Navbar2Component />
      <main>{children}</main>
      <FooterComponent />
      <DirectWaComponent />
    </>
  );
};

export default UserTemplate2;
