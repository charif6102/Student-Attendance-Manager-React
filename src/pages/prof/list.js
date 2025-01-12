

import Classrooms from "@/sections/prof/list";
import { getCookie } from "@/tools/util";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";



const Page = () => {
const router=useRouter();
let isAuthenticated =false;
useEffect(() => {
  
    isAuthenticated = getCookie('isAuthenticated');
    console.log('isAuthenticated:', isAuthenticated);
    if (isAuthenticated !='true' ){
    
        router.push('/auth/login');
    }
  }, []);



return  ( 
    <> 
      
        <Classrooms  />
   </>
    
);
}

Page.getLayout = function getLayout(page) {
    return (
      
        <>{page}</>
   
    )
  };
  export default Page;