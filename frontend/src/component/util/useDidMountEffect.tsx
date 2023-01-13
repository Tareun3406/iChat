import React, {DependencyList, EffectCallback, useEffect, useRef} from "react";

const useDidMountEffect = (func: EffectCallback, defs: DependencyList)=>{
    const didMount = useRef(false);
    useEffect(()=>{
        if (didMount.current) func();
        else didMount.current = true;
    },defs)
}

export default useDidMountEffect;