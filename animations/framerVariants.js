export const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99],
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.4,
        },
    },
};

export const containerVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
};
