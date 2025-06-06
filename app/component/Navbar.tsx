import Link from "next/link";
import Image from "next/image";
import React from "react";
import {auth, signOut, signIn} from "@/auth";


const Navbar = async() =>{
    const session = await auth()

    return(
        <header className="px-5 py-3 bg-blue-300 shadow-sm font-work-san">
            <nav className="flex justify-between items-center">
                <Link href = "/">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                <div className="flex items-center gap-5">
                    {session && session?.user ?(
                        <>
                            <Link href = "/startup/create">
                                <span>Create</span>
                            </Link>

                            <form action={async() => {
                                "use server";
                                
                                await signOut();
                                }}>
                                <button type ='submit'>
                                    <span>SignOut</span>
                                </button>
                            </form>
                            
                            // get the user id form github account
                            <Link href = {'/user/${session?.id}'}>
                                <span>{session?.user?.id}</span>
                            </Link>
                        </>   
                    ): (
                        <form action={ async() => {
                            "use server";   
                            await signIn('github');
                        }}>
                            <button type ='submit'>
                                <span>SignIn</span>
                            </button>
                        </form>
                    )}
                </div>

            </nav>
        </header>
    )
}

export default Navbar