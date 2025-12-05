import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);

    // Use motion values for better performance
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring animation for the trailing effect
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver); // Using mouseover for event delegation

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Main Dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-prakida-flame rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                }}
            />
            {/* Outer Ring / Trailer */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-prakida-water rounded-full pointer-events-none z-[9998] mix-blend-difference"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    x: -8, // Center adjustment based on size difference (32 - 16) / 2 = 8... wait. 
                    // Main dot is 16px (w-4). Trailer is 32px (w-8).
                    // Both are positioned at top-left.
                    // If cursorX is at mouseX - 16/2? No, cursorX is mouseX - 16 in code? 
                    // Let's adjust.
                }}
                animate={{
                    scale: isHovering ? 2.5 : 1,
                    borderColor: isHovering ? '#ef4444' : '#38bdf8', // Flame red : Water blue
                    backgroundColor: isHovering ? 'rgba(239, 68, 68, 0.1)' : 'transparent'
                }}
                transition={{ duration: 0.2 }}
            />
        </>
    );
};

export default CustomCursor;
