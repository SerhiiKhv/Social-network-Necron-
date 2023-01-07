import React from 'react';
import Preloader from "../Component/common/Preloader/Preloader";

export function withSuspense (WrappedComponent: React.ComponentType){
    return (props: any) => {
         return <React.Suspense fallback={<Preloader/>}>
             <WrappedComponent {...props}/>
         </React.Suspense>
    }
}
