import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ListOrdered } from "lucide-react";
import { GetAllCategories, getMyOrders } from "@/sanity/helpers/queries";
const Header = async () => {
  const user = await currentUser();
  const {userId} = await auth()
  const categories = await GetAllCategories();
  let orders=null;
  if(userId){
    orders = await getMyOrders(userId);
  }
  return (
    <header
      className={"border-b border-b-gray-500 py-5 sticky top-0 z-50 bg-white"}
    >
      <Container
        className={"flex items-center justify-between gap-7 text-lightColor"}
      >
        <HeaderMenu categories={categories}/>
        <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
          <MobileMenu />
          <Logo>Muslish</Logo>
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <ClerkLoaded>
            {user ? (
              <div className={"flex items-center justify-center gap-5"}>
                <Link href={"/orders"} className={"group relative"}>
                  <ListOrdered
                    className={"group-hover:text-darkColor hoverEffect w-5 h-5"}
                  />

                  <span
                    className={
                      " absolute -top-1 -right-1 text-white bg-darkColor w-3.5 h-3.5 rounded-full flex items-center justify-center font-semibold text-xs"
                    }
                  >
                    {orders?.length ?? 0}
                  </span>
                </Link>
                <UserButton />
              </div>
            ) : (
              <SignInButton mode="modal">
                <div>
                  <button
                    className={
                      "text-sm hover:text-darkColor hoverEffect font-semibold"
                    }
                  >
                    Login
                  </button>
                </div>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
