import { animate } from "framer-motion";
import React, { useEffect, useRef } from "react";

export default function Counter({ from, to, digit }: { from: number, to: number, digit?: number }) {
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = nodeRef.current;

        const controls = animate(from, to, {
            duration: 1,
            onUpdate(value) {
                if (node) {
                    node.textContent = value.toFixed(digit || 0);
                }
            }
        });

        return () => controls.stop();
    }, [from, to]);

    return <span ref={nodeRef}></span>;
}