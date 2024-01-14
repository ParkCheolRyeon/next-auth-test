import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function SuccessLogin() {
  const { data: session } = useSession<any>();
  console.log("로그인 성공페이지에서 찍은 세션", session);

  return (
    <div className="flex flex-col">
      로그인 성공 리다렉 페이지
      <div className="text-xl">{session?.user?.name}</div>
      <div className="text-xl">{session?.user?.email}</div>
      {/* <Image src={session?.user?.image!} width={10} height={10} alt="user" /> */}
      <Button variant="outlined" onClick={() => signOut({ callbackUrl: "/" })}>
        {" "}
        로그아웃{" "}
      </Button>
    </div>
  );
}
