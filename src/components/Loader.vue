<template>
    <span></span>
</template>

<style scoped>
span {
    position: absolute;
    width: 100%;
    height: 0.125rem;
    background-color: #eee;
}
span:before {
    content: '';
    position: absolute;
    background-color: #4b92db;
    bottom: 0;
    height: 100%;
    transform-origin: center;
    animation-delay: 0ms;
    animation: fadeWidth ease 1000ms infinite;
    opacity: 0;
}
@keyframes fadeWidth {
    0% {
        width: 0%;
        opacity: 0;
        transform: translateX(-50%);
        left: 50%;
    }
    25% {
        opacity: 1;
    }
    50% {
        opacity: 1;
        width: 100%;
    }
    75% {
        width: 100%;
        transform: translateX(0);
        left: 0;
    }
    100% {
        opacity: 0;
    }
}
</style>
