import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

const RecoilWrapper = ({ children }: { children: ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilWrapper;
