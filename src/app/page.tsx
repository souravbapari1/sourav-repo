import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div>
      <Input />
      <Button>Button</Button>
      <Link href="/about">Home</Link>
    </div>
  );
}

export default page;
