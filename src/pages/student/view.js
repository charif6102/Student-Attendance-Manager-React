
import Classrooms from "@/sections/prof/list";
import ViewStudent from "@/sections/student/view";
import { createContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { getCookie } from "@/tools/util";

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
  

const { query } = router;
const studentId = query.studentId;
return  ( 
    <> 
      
        <ViewStudent id={studentId} />
        
   </>
    
);
}

Page.getLayout = function getLayout(page) {
    return (
      
        <>{page}</>
   
    )
  };
  export default Page;