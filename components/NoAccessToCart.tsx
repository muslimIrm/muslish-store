import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Logo from "./Logo";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
const NoAccessToCart = () => {
  return (
    <div className="flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4">
      <Card className="w-full max-w-md!">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Logo>Muslish</Logo>
          </div>
          <CardTitle className="font-bold text-center text-2xl">Welcome back!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Sign in to View your Cart Items and checkout. Don&apos;t miss out one your favorite products.
          </p>
          <SignInButton mode="modal">
            <Button className={"font-bold w-full"} size={"lg"}>
              Sign In
            </Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div>
            Don&apos;t have an account?
          </div>
          <SignUpButton>
            <Button variant={"outline"} className={"w-full"} size={"lg"}>Sign up</Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccessToCart;
